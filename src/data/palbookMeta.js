// Curriculum metadata for the PalBook section, sourced from the official
// "English for Palestine" books (Pupil's Book + Teacher's Book).
//
// For each unit: its title, a theme emoji, and the Pupil's Book page range.
// For each period (lesson): the Pupil's Book page it covers and the skill it
// focuses on. Page numbers are taken from the book; skill labels are the
// lesson's main focus.
//
// Only units listed here get the richer "Period N · Page X" + skill display;
// any lesson without an entry keeps its previous title/description, so this can
// be filled in one unit at a time without affecting the rest.
export const PALBOOK_META = {
  7: {
    1: {
      title: 'Oh, hello!',
      emoji: '👋',
      pageStart: 4,
      pageEnd: 11,
      periods: {
        1: { page: 4, skill: 'Vocabulary & Listening' },
        2: { page: 5, skill: 'Listening' },
        3: { page: 6, skill: 'Reading comprehension' },
        4: { page: 7, skill: 'Listening & Pronunciation' },
        5: { page: 8, skill: 'Grammar — Present simple & adverbs of frequency' },
        6: { page: 9, skill: 'Listening & Speaking' },
        7: { page: 10, skill: 'Writing — an email' },
        8: { page: 11, skill: 'Project & Speaking' },
      },
    },
  },
};

export const getUnitMeta = (grade, unit) =>
  PALBOOK_META?.[Number(grade)]?.[Number(unit)] || null;

export const getPeriodMeta = (grade, unit, period) =>
  getUnitMeta(grade, unit)?.periods?.[Number(period)] || null;
