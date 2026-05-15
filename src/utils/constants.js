// =========================================================
// PalBook Live constants
// Created by T. Wad Refae
// =========================================================

export const TEACHER_NAME = 'T. Wad Refae';

// Sections of the platform
export const SECTIONS = {
  GENERAL: 'general',
  PALBOOK: 'palbook',
  GAMES: 'games',
};

// General section subsections
export const GENERAL_SUBSECTIONS = {
  GRAMMAR: 'grammar',
  PRONUNCIATION: 'pronunciation',
  READING: 'reading',
};

// Grades 5 → 9 (Middle school)
export const GRADES = [5, 6, 7, 8, 9];

// Units 1 → 18
export const UNITS = Array.from({ length: 18 }, (_, i) => i + 1);

// Lessons 1 → 12
export const LESSONS = Array.from({ length: 12 }, (_, i) => i + 1);

// Roles
export const ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
};

// Custom lesson/game emojis (chosen by T. Wad Refae)
export const LESSON_EMOJIS = [
  '🎧', '📖', '🔤', '🎯', '🎮', '🗒️',
  '📜', '✏️', '📝', '🔏', '🎴', '🧩',
  '🧠', '🗣️', '💬',
];