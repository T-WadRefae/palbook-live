// Static PalBook (curriculum) lessons — served from palbook-lessons GitHub Pages.
// These appear in the PalBook section without needing Firestore documents.
// The teacher can override any entry by uploading a Firestore lesson with the
// same id (Firestore docs win over static fallbacks with the same id).

const BASE = 'https://t-wadrefae.github.io/palbook-lessons';

export const PALBOOK_LESSONS = [
  // ───────── Grade 5 · Unit 2 — "Our Country" ─────────
  {
    id: 'g5-u2-p1',
    title: 'Our Country · Period 1 — Vocabulary',
    titleAr: 'بلدنا · الحصة 1 — المفردات',
    thumbnail: '📒',
    section: 'palbook',
    grade: 5, unit: 2, lesson: 1,
    fileUrl: `${BASE}/grade5/unit2p1.html`,
    static: true,
  },
  {
    id: 'g5-u2-p2',
    title: 'Our Country · Period 2 — Listening',
    titleAr: 'بلدنا · الحصة 2 — الاستماع',
    thumbnail: '🎧',
    section: 'palbook',
    grade: 5, unit: 2, lesson: 2,
    fileUrl: `${BASE}/grade5/unit2p2.html`,
    static: true,
  },
  {
    id: 'g5-u2-p3',
    title: 'Our Country · Period 3 — Reading',
    titleAr: 'بلدنا · الحصة 3 — القراءة',
    thumbnail: '✅',
    section: 'palbook',
    grade: 5, unit: 2, lesson: 3,
    fileUrl: `${BASE}/grade5/unit2p3.html`,
    static: true,
  },
  {
    id: 'g5-u2-p4',
    title: 'Our Country · Period 4 — Look (is / are)',
    titleAr: 'بلدنا · الحصة 4 — (is / are)',
    thumbnail: '🔍',
    section: 'palbook',
    grade: 5, unit: 2, lesson: 4,
    fileUrl: `${BASE}/grade5/unit2p4.html`,
    static: true,
  },
  {
    id: 'g5-u2-p5',
    title: 'Our Country · Period 5 — Present Continuous',
    titleAr: 'بلدنا · الحصة 5 — المضارع المستمر',
    thumbnail: '⏰',
    section: 'palbook',
    grade: 5, unit: 2, lesson: 5,
    fileUrl: `${BASE}/grade5/unit2p5.html`,
    static: true,
  },
  {
    id: 'g5-u2-p6',
    title: 'Our Country · Period 6 — Song',
    titleAr: 'بلدنا · الحصة 6 — الأغنية',
    thumbnail: '🎤',
    section: 'palbook',
    grade: 5, unit: 2, lesson: 6,
    fileUrl: `${BASE}/grade5/unit2p6.html`,
    static: true,
  },
  {
    id: 'g5-u2-p7',
    title: 'Our Country · Period 7 — Writing',
    titleAr: 'بلدنا · الحصة 7 — الكتابة',
    thumbnail: '🧩',
    section: 'palbook',
    grade: 5, unit: 2, lesson: 7,
    fileUrl: `${BASE}/grade5/unit2p7.html`,
    static: true,
  },
  {
    id: 'g5-u2-p8',
    title: 'Our Country · Period 8 — Unit Project',
    titleAr: 'بلدنا · الحصة 8 — مشروع الوحدة',
    thumbnail: '🖼️',
    section: 'palbook',
    grade: 5, unit: 2, lesson: 8,
    fileUrl: `${BASE}/grade5/unit2p8.html`,
    static: true,
  },
];
