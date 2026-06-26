// Static writing lessons — served from palbook-lessons GitHub Pages.
// These appear in General → Writing without needing Firestore documents.
// The teacher can override any entry by uploading a Firestore lesson with
// the same slug as the id.
//
// Writing lessons follow a worksheet-based, tab template (Objectives →
// Model → Build → Checklist → Worksheet) with NO live quiz — the graded
// worksheet is uploaded separately. Each lesson has its own immersive theme.

const BASE = 'https://t-wadrefae.github.io/palbook-lessons/writing';

export const WRITING_LESSONS = [
  // ---------------- Grade 5 ----------------
  {
    id: 'writing-grade5-punctuation',
    title: 'Punctuation & Handwriting',
    titleAr: 'علامات الترقيم والخط — قطار الجملة',
    description: 'Capital letters to start, full stops and question marks to end, and neat handwriting — taught with the Sentence Train.',
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
    titleAr: 'الكتابة عن العائلة — شجرة العائلة',
    description: 'Write simple sentences to describe family members and their interests, using he/she correctly.',
    thumbnail: '🌳',
    section: 'general',
    subsection: 'writing',
    grades: [5],
    fileUrl: `${BASE}/grade5-families.html`,
    static: true,
  },
  {
    id: 'writing-grade5-sports',
    title: 'Describing Sports & Races',
    titleAr: 'وصف الرياضة والسباقات — مضمار السباق',
    description: 'Use ordinal numbers (1st, 2nd, 3rd…) to describe race positions and write full result sentences.',
    thumbnail: '🏁',
    section: 'general',
    subsection: 'writing',
    grades: [5],
    fileUrl: `${BASE}/grade5-sports.html`,
    static: true,
  },
  {
    id: 'writing-grade5-comparatives',
    title: 'Comparatives & Superlatives',
    titleAr: 'المقارنة والتفضيل — حائط القياس',
    description: 'Compare two things with -er + than, and pick the best of all with the -est / the most.',
    thumbnail: '📏',
    section: 'general',
    subsection: 'writing',
    grades: [5],
    fileUrl: `${BASE}/grade5-comparatives.html`,
    static: true,
  },

  // ---------------- Grade 6 ----------------
  {
    id: 'writing-grade6-but-because',
    title: 'Using "But" & "Because"',
    titleAr: 'الربط بـ but و because — عملة الوصل',
    description: 'Join two sentences to show contrast (but) or give a reason (because), and choose the right connector.',
    thumbnail: '🪙',
    section: 'general',
    subsection: 'writing',
    grades: [6],
    fileUrl: `${BASE}/grade6-but-because.html`,
    static: true,
  },
  {
    id: 'writing-grade6-past-simple',
    title: 'The Past Simple Story',
    titleAr: 'سرد الماضي البسيط — شريط الفيلم',
    description: 'Narrate past events (a summer holiday) with regular (-ed) and irregular verbs and past time words.',
    thumbnail: '🎬',
    section: 'general',
    subsection: 'writing',
    grades: [6],
    fileUrl: `${BASE}/grade6-past-simple.html`,
    static: true,
  },
  {
    id: 'writing-grade6-posters-quizzes',
    title: 'Making Posters & Quizzes',
    titleAr: 'تصميم الملصقات والمسابقات — لوحة الحديقة',
    description: 'Design an instructions poster (park rules) with imperatives, Don\'t, Please and must, and write quiz questions.',
    thumbnail: '🪧',
    section: 'general',
    subsection: 'writing',
    grades: [6],
    fileUrl: `${BASE}/grade6-posters-quizzes.html`,
    static: true,
  },
];
