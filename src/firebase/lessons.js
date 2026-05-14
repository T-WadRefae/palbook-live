import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';

const LESSONS_COLLECTION = 'lessons';

/**
 * Add a new lesson (teacher only)
 */
export const addLesson = async (lessonData) => {
  const docRef = await addDoc(collection(db, LESSONS_COLLECTION), {
    ...lessonData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

/**
 * Get all lessons (with optional filters)
 */
export const getLessons = async (filters = {}) => {
  let q = collection(db, LESSONS_COLLECTION);
  const constraints = [];

  if (filters.section) constraints.push(where('section', '==', filters.section));
  if (filters.grade) constraints.push(where('grade', '==', filters.grade));
  if (filters.unit) constraints.push(where('unit', '==', filters.unit));

  constraints.push(orderBy('createdAt', 'desc'));
  q = query(collection(db, LESSONS_COLLECTION), ...constraints);

  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/**
 * Get a single lesson by ID
 */
export const getLesson = async (id) => {
  const docSnap = await getDoc(doc(db, LESSONS_COLLECTION, id));
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

/**
 * Update an existing lesson
 */
export const updateLesson = async (id, updates) => {
  await updateDoc(doc(db, LESSONS_COLLECTION, id), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
};

/**
 * Delete a lesson
 */
export const deleteLesson = async (id) => {
  await deleteDoc(doc(db, LESSONS_COLLECTION, id));
};

/**
 * Update student progress
 */
export const updateProgress = async (uid, lessonId, completed = true) => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return;

  const data = userSnap.data();
  const progress = { ...(data.progress || {}) };
  progress[lessonId] = { completed, completedAt: new Date().toISOString() };

  await updateDoc(userRef, { progress });
};

/**
 * Add points to student
 */
export const addPoints = async (uid, points) => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return;

  const currentPoints = userSnap.data().points || 0;
  await updateDoc(userRef, { points: currentPoints + points });
};
