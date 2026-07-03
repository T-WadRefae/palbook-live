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
import { fetchRepoLessons } from '../utils/lessonsRepo';
import { PALBOOK_LESSONS } from '../data/palbookLessons';
import { GRAMMAR_LESSONS } from '../data/grammarLessons';
import { READING_LESSONS } from '../data/readingLessons';
import { WRITING_LESSONS } from '../data/writingLessons';
import { GAMES } from '../data/gamesLessons';

const LESSONS_COLLECTION = 'lessons';

// Auto-published lessons shipped with the app (served from GitHub Pages).
// A Firestore document with the same id overrides its static entry.
const STATIC_LESSONS = [
  ...PALBOOK_LESSONS,
  ...GRAMMAR_LESSONS,
  ...READING_LESSONS,
  ...WRITING_LESSONS,
  ...GAMES,
];

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

const normalizeUrl = (u) => {
  const s = (u || '').trim();
  try {
    return decodeURI(s).toLowerCase();
  } catch {
    return s.toLowerCase();
  }
};

const applyLessonFilters = (list, filters) => {
  let out = list;
  if (filters.section) out = out.filter((l) => l.section === filters.section);
  if (filters.grade) out = out.filter((l) => Number(l.grade) === Number(filters.grade));
  if (filters.unit) out = out.filter((l) => Number(l.unit) === Number(filters.unit));
  return out;
};

// One merged view of all lesson sources:
//   1. Firestore registry (teacher-managed; wins over a static entry with the same id)
//   2. Static lessons shipped with the app (curated titles, `static: true`)
//   3. Lessons discovered in the palbook-lessons GitHub repo (`discovered: true`)
//      — dropped when their URL is already known, kept otherwise so a plain
//      `git push` is enough for a lesson to reach the site and the dashboard.
// Either remote source may fail independently; the rest still renders.
export const getMergedLessons = async (filters = {}, { force = false } = {}) => {
  const [fire, repo] = await Promise.allSettled([
    getLessons(filters),
    fetchRepoLessons({ force }),
  ]);
  const registered = fire.status === 'fulfilled' ? fire.value : [];
  const discovered = repo.status === 'fulfilled' ? repo.value : [];

  const registeredIds = new Set(registered.map((l) => l.id));
  const statics = applyLessonFilters(STATIC_LESSONS, filters).filter(
    (l) => !registeredIds.has(l.id)
  );
  const base = [...registered, ...statics];

  const seenUrls = new Set(base.map((l) => normalizeUrl(l.fileUrl)));
  const fresh = applyLessonFilters(discovered, filters).filter(
    (l) => !seenUrls.has(normalizeUrl(l.fileUrl))
  );

  return [...base, ...fresh];
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