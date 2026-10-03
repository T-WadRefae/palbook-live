// Static Phonics (pronunciation) lessons — served from palbook-lessons GitHub Pages.
// They appear under General → Phonics without needing a backend.

const BASE = 'https://t-wadrefae.github.io/palbook-lessons/Phonics';

export const PHONICS_LESSONS = [
  {
    id: 'phonics-c-quest',
    title: 'The Sea C-Quest 🏴‍☠️',
    titleAr: 'مغامرة حرف C في البحر',
    description: 'How the letter C sounds: /k/, /s/, ch, ck and ci.',
    thumbnail: '🏴‍☠️',
    section: 'general',
    subsection: 'pronunciation',
    grades: [5, 6, 7, 8, 9],
    fileUrl: `${BASE}/C.html`,
    static: true,
  },
  {
    id: 'phonics-silent-h-w',
    title: 'Silent H & W — Magic Letters',
    titleAr: 'مغامرة الحروف السحرية',
    description: 'Spot the silent H and W in words like who, hour and honest.',
    thumbnail: '🔮',
    section: 'general',
    subsection: 'pronunciation',
    grades: [5, 6, 7, 8, 9],
    fileUrl: `${BASE}/H-W.html`,
    static: true,
  },
];
