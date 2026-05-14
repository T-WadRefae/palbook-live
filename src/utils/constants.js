// =========================================================
// PalBook Live constants
// Created by T. Wad Refae 
// =========================================================

export const TEACHER_NAME = 'T. Wad Refae';

// Sections of the platform
export const SECTIONS = {
  GENERAL: 'general',
  PALBOOK: 'palbook',
};

// General section subsections
export const GENERAL_SUBSECTIONS = {
  GRAMMAR: 'grammar',
  PRONUNCIATION: 'pronunciation',
};

// Grades 1 → 9 covered by English for Palestine + custom grades
export const GRADES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Units 1 → 16 covered across the curriculum
export const UNITS = Array.from({ length: 16 }, (_, i) => i + 1);

// Lessons 1 → 6 typically per unit
export const LESSONS = [1, 2, 3, 4, 5, 6];

// Roles
export const ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
};

// Sample emoji thumbnails for lessons
export const LESSON_EMOJIS = ['📚', '✏️', '📝', '🎓', '🌟', '🎯', '🎨', '🔤', '💬', '📖', '🗣️', '🎵', '🌍', '🎮', '🏆'];

// Sample game data (used as fallback if Firestore games collection is empty)
export const SAMPLE_QUIZ_QUESTIONS = [
  {
    question: 'What is the past tense of "go"?',
    questionAr: 'ما هو الفعل الماضي من "go"؟',
    options: ['goed', 'went', 'gone', 'going'],
    correctIndex: 1,
  },
  {
    question: 'Which word is a noun?',
    questionAr: 'أي من هذه الكلمات اسم؟',
    options: ['quickly', 'happy', 'school', 'run'],
    correctIndex: 2,
  },
  {
    question: 'Choose the correct sentence:',
    questionAr: 'اختر الجملة الصحيحة:',
    options: ['She go to school.', 'She goes to school.', 'She going to school.', 'She gone to school.'],
    correctIndex: 1,
  },
  {
    question: 'What is the plural of "child"?',
    questionAr: 'ما هو جمع كلمة "child"؟',
    options: ['childs', 'childes', 'children', 'childrens'],
    correctIndex: 2,
  },
  {
    question: 'Which is a question word?',
    questionAr: 'أي من هذه أداة استفهام؟',
    options: ['because', 'where', 'and', 'but'],
    correctIndex: 1,
  },
];

export const SAMPLE_MATCHING_PAIRS = [
  { en: 'Apple', ar: 'تفاحة' },
  { en: 'Book', ar: 'كتاب' },
  { en: 'School', ar: 'مدرسة' },
  { en: 'Teacher', ar: 'معلّم' },
  { en: 'Student', ar: 'طالب' },
  { en: 'House', ar: 'بيت' },
];

export const SAMPLE_SENTENCES = [
  { words: ['I', 'go', 'to', 'school', 'every', 'day'], hint: 'Present simple' },
  { words: ['She', 'is', 'reading', 'a', 'book'], hint: 'Present continuous' },
  { words: ['We', 'love', 'Palestine', 'very', 'much'], hint: 'Express love for homeland' },
  { words: ['The', 'teacher', 'is', 'very', 'kind'], hint: 'Describing a person' },
];

export const SAMPLE_PRONUNCIATION = [
  { word: 'School', options: ['School', 'Skull', 'Scull', 'Scole'], correct: 0 },
  { word: 'Book', options: ['Bok', 'Book', 'Buk', 'Booke'], correct: 1 },
  { word: 'Teacher', options: ['Teecher', 'Ticher', 'Teacher', 'Tichar'], correct: 2 },
  { word: 'Friend', options: ['Frend', 'Friend', 'Frind', 'Freind'], correct: 1 },
];
