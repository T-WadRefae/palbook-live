// Firebase-free lessons service.
//
// The site no longer uses a teacher dashboard or a Firestore registry: every
// lesson is published by pushing an HTML file to the palbook-lessons GitHub
// repo. Lessons reach the site from two sources:
//   1. Static lessons shipped with the app (curated titles, `static: true`).
//   2. Lessons discovered in the palbook-lessons repo via its manifest
//      (`discovered: true`) — so a plain `git push` is enough to publish.
//
// getLessons() returns [] on purpose: the public pages add their own static
// lists and merge on top, so an empty dynamic registry keeps that logic intact.
import { fetchRepoLessons } from '../utils/lessonsRepo';
import { PALBOOK_LESSONS } from './palbookLessons';
import { GRAMMAR_LESSONS } from './grammarLessons';
import { READING_LESSONS } from './readingLessons';
import { WRITING_LESSONS } from './writingLessons';
import { GAMES } from './gamesLessons';

// Auto-published lessons shipped with the app (served from GitHub Pages).
const STATIC_LESSONS = [
  ...PALBOOK_LESSONS,
  ...GRAMMAR_LESSONS,
  ...READING_LESSONS,
  ...WRITING_LESSONS,
  ...GAMES,
];

const applyLessonFilters = (list, filters = {}) => {
  let out = list;
  if (filters.section) out = out.filter((l) => l.section === filters.section);
  if (filters.grade) out = out.filter((l) => Number(l.grade) === Number(filters.grade));
  if (filters.unit) out = out.filter((l) => Number(l.unit) === Number(filters.unit));
  return out;
};

const normalizeUrl = (u) => {
  const s = (u || '').trim();
  try {
    return decodeURI(s).toLowerCase();
  } catch {
    return s.toLowerCase();
  }
};

// Kept as the "dynamic registry" hook the public pages call. There is no longer
// a Firestore backend, so it resolves to an empty list; each page then falls
// back to its own static lessons.
export const getLessons = async () => [];

// One merged view for the PalBook section:
//   1. Static lessons shipped with the app.
//   2. Lessons discovered in the palbook-lessons repo (dropped when their URL
//      is already known, kept otherwise so a plain `git push` publishes them).
// The repo source may fail; the static list still renders.
export const getMergedLessons = async (filters = {}, { force = false } = {}) => {
  const repo = await Promise.allSettled([fetchRepoLessons({ force })]);
  const discovered = repo[0].status === 'fulfilled' ? repo[0].value : [];

  const base = applyLessonFilters(STATIC_LESSONS, filters);
  const seenUrls = new Set(base.map((l) => normalizeUrl(l.fileUrl)));
  const fresh = applyLessonFilters(discovered, filters).filter(
    (l) => !seenUrls.has(normalizeUrl(l.fileUrl))
  );

  return [...base, ...fresh];
};

// View tracking used to write to Firestore; with no backend it is a no-op so
// callers don't need to special-case it.
export const trackLessonView = async () => {};
