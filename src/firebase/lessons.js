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
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';

const LESSONS_COLLECTION = 'lessons';

export const addLesson = async (lessonData) => {
  const docRef = await addDoc(collection(db, LESSONS_COLLECTION), {
    ...lessonData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

export const getLessons = async (filters = {}) => {
  const constraints = [];

  if (filters.section) constraints.push(where('section', '==', filters.section));
  if (filters.grade) constraints.push(where('grade', '==', filters.grade));
  if (filters.unit) constraints.push(where('unit', '==', filters.unit));

  const q = constraints.length > 0
    ? query(collection(db, LESSONS_COLLECTION), ...constraints)
    : collection(db, LESSONS_COLLECTION);

  const snapshot = await getDocs(q);
  const lessons = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

  // Sort manually by createdAt (most recent first)
  lessons.sort((a, b) => {
    const aTime = a.createdAt?.seconds || 0;
    const bTime = b.createdAt?.seconds || 0;
    return bTime - aTime;
  });

  return lessons;
};

export const getLesson = async (id) => {
  const docSnap = await getDoc(doc(db, LESSONS_COLLECTION, id));
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const updateLesson = async (id, updates) => {
  await updateDoc(doc(db, LESSONS_COLLECTION, id), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
};

export const deleteLesson = async (id) => {
  await deleteDoc(doc(db, LESSONS_COLLECTION, id));
};

export const updateProgress = async (uid, lessonId, completed = true) => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return;

  const data = userSnap.data();
  const progress = { ...(data.progress || {}) };
  progress[lessonId] = { completed, completedAt: new Date().toISOString() };

  await updateDoc(userRef, { progress });
};

export const addPoints = async (uid, points) => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return;

  const currentPoints = userSnap.data().points || 0;
  await updateDoc(userRef, { points: currentPoints + points });
};