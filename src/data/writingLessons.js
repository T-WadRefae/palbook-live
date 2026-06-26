// Static writing lessons — served from palbook-lessons GitHub Pages.
// These appear in General → Writing without needing Firestore documents.
// The teacher can override any entry by uploading a Firestore lesson with
// the same slug as the id.

const BASE = 'https://t-wadrefae.github.io/palbook-lessons/writing';

export const WRITING_LESSONS = [
  // ---------------- Grade 5 ----------------
  {
    id: 'writing-grade5-punctuation',
    title: 'Punctuation & Handwriting',
    titleAr: 'علامات الترقيم والخط',
    description: 'Build neat sentences with capital letters, full stops and question marks. A "Sentence Train" lesson with objectives, practice, a checklist and a worksheet.',
    thumbnail: '🚂',
    section: 'general',
    subsection: 'writing',
    grades: [5],
    fileUrl: `${BASE}/grade5-punctuation.html`,
    static: true,
  },
  {
    id: 'writing-grade5-families',
    title: 'Writing about Families',
    titleAr: 'الكتابة عن العائلة',
    description: 'Write a short paragraph about your family. A "Family Tree" lesson with objectives, sentence building, a checklist and a worksheet.',
    thumbnail: '🌳',
    section: 'general',
    subsection: 'writing',
    grades: [5],
    fileUrl: `${BASE}/grade5-families.html`,
    static: true,
  },
];
