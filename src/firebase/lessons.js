import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
  increment,
} from 'firebase/firestore';
import { db } from './config';

const LESSONS_COLLECTION = 'lessons';

export const addLesson = async (lessonData) => {
  const docRef = await addDoc(collection(db, LESSONS_COLLECTION), {
    ...lessonData,
    views: 0,
    lastViewedAt: null,
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

// Create (or overwrite) a lesson document at a specific id.
// Used when a teacher edits an auto-published static lesson: we persist a
// Firestore override keyed by the static lesson's id so it both appears in the
// public pages (Firestore docs win over static fallbacks with the same id) and
// becomes a regular, editable lesson in the dashboard.
export const setLesson = async (id, lessonData) => {
  const ref = doc(db, LESSONS_COLLECTION, id);
  const existing = await getDoc(ref);
  await setDoc(
    ref,
    {
      ...lessonData,
      // Only seed these on first creation so edits don't reset them.
      ...(existing.exists()
        ? {}
        : { views: 0, lastViewedAt: null, createdAt: serverTimestamp() }),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};

export const deleteLesson = async (id) => {
  await deleteDoc(doc(db, LESSONS_COLLECTION, id));
};

// Track lesson views (called when student opens a lesson)
export const trackLessonView = async (lessonId) => {
  try {
    await updateDoc(doc(db, LESSONS_COLLECTION, lessonId), {
      views: increment(1),
      lastViewedAt: serverTimestamp(),
    });
  } catch (err) {
    // Silently fail - don't disrupt user experience
    console.error('Failed to track view:', err);
  }
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