// Static games — served from palbook-lessons GitHub Pages.
// These appear in the Games section without needing Firestore documents.
// The teacher can override any entry by uploading a Firestore game with
// the same slug as the id.

const BASE = 'https://t-wadrefae.github.io/palbook-lessons/games';

export const GAMES = [
  {
    id: 'game-spelling-bee',
    title: 'Spelling Bee 🐝',
    titleAr: 'نحلة التهجئة',
    description:
      'A listening spelling game: hear the word, then spell it. Curriculum-tied word banks for Grades 5–9, Arabic hints, three help levels, and a honey/hive theme with sparkle and confetti rewards.',
    thumbnail: '🐝',
    section: 'games',
    grades: [5, 6, 7, 8, 9],
    fileUrl: `${BASE}/SpellingBee.html`,
    static: true,
  },
];
