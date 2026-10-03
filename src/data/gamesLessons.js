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
  {
    id: 'game-word-bomber',
    title: 'Word Bomber 💣',
    titleAr: 'مُفجِّر الكلمات',
    description:
      'A Bomberman-style maze: drop bombs to blow up crates and uncover hidden coins. Each coin opens a vocabulary question — meaning, synonym or antonym — from a 400-word bank. Difficulty levels, sound and visual effects.',
    thumbnail: '💣',
    section: 'games',
    grades: [5, 6, 7, 8, 9],
    fileUrl: `${BASE}/WordBomber.html`,
    static: true,
  },
  {
    id: 'game-hopscotch',
    title: 'Hopscotch English 🪨',
    titleAr: 'لعبة الحجلة بالإنجليزية',
    thumbnail: '🪨',
    section: 'games',
    grades: [5, 6, 7, 8, 9],
    fileUrl: `${BASE}/HopscotchEnglish.html`,
    static: true,
  },
  {
    id: 'game-jungle-treasure-hunt',
    title: 'Jungle Treasure Hunt 🌴',
    titleAr: 'البحث عن كنز الغابة',
    thumbnail: '🌴',
    section: 'games',
    grades: [5, 6, 7, 8, 9],
    fileUrl: `${BASE}/JungleTreasureHunt.html`,
    static: true,
  },
  {
    id: 'game-palestine-memory',
    title: 'Palestine Memory Game 🇵🇸',
    titleAr: 'لعبة الذاكرة: معالم فلسطين',
    description: 'A memory game about places in Palestine.',
    thumbnail: '🇵🇸',
    section: 'games',
    grades: [5, 6, 7, 8, 9],
    fileUrl: `${BASE}/PalestineLandmarks.html`,
    static: true,
  },
  {
    id: 'game-vocab-maze',
    title: 'Vocab Maze 🧩',
    titleAr: 'متاهة المفردات',
    description: 'A vocabulary maze for Grade 8.',
    thumbnail: '🧩',
    section: 'games',
    grades: [8],
    fileUrl: `${BASE}/VocabMaze.html`,
    static: true,
  },
  {
    id: 'game-synonym-antonym-battle',
    title: 'Synonym & Antonym Battle ⚔️',
    titleAr: 'معركة المرادفات والأضداد',
    description: 'Battle with synonyms and antonyms.',
    thumbnail: '⚔️',
    section: 'games',
    grades: [5, 6, 7, 8, 9],
    fileUrl: `${BASE}/synonym_antonym_battle_mobile.html`,
    static: true,
  },
  {
    id: 'game-word-race',
    title: 'Word Race ⚡',
    titleAr: 'سباق الكلمات',
    thumbnail: '⚡',
    section: 'games',
    grades: [5, 6, 7, 8, 9],
    fileUrl: `${BASE}/word_race_mobile.html`,
    static: true,
  },
];
