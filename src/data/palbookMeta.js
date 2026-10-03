// Curriculum metadata for the PalBook section, sourced from the official
// "English for Palestine" books (Pupil's Book + Teacher's Book).
//
// Per unit: title, a theme emoji, and the Pupil's Book page range (from the
// book's language overview table).
// Per period (lesson): its main skill, plus the Pupil's Book page when the
// Teacher's Book states it. Grades 5–7 list "Period N – PB page M" for every
// period. Grade 9 follows the same one-page-per-period order (page = unit start
// + period - 1), as confirmed by the teacher. Grade 8's 12 periods don't map to
// pages one to one, so it shows the unit's page range only.
// Skill labels are each lesson's main focus, drafted from its activities.
//
// Units not listed keep their previous title/description. Partial units list
// only the periods that have been published so far.
export const PALBOOK_META = {
  5: {
    1: {
      title: 'New friends',
      emoji: '🤝',
      pageStart: 4, pageEnd: 11,
      periods: {
        1: { page: 4, skill: 'Vocabulary' },
        2: { page: 5, skill: 'Speaking' },
        3: { page: 6, skill: 'Reading comprehension' },
        4: { page: 7, skill: 'Speaking' },
        5: { page: 8, skill: 'Listening' },
        6: { page: 9, skill: 'Reading comprehension' },
        7: { page: 10, skill: 'Speaking' },
        8: { page: 11, skill: 'Project & Speaking' },
      },
    },
    2: {
      title: 'Our country',
      emoji: '🏞️',
      pageStart: 12, pageEnd: 19,
      periods: {
        1: { page: 12, skill: 'Vocabulary' },
        2: { page: 13, skill: 'Reading comprehension' },
        3: { page: 14, skill: 'Pronunciation & Listening' },
        4: { page: 15, skill: 'Reading comprehension' },
        5: { page: 16, skill: 'Grammar' },
        6: { page: 17, skill: 'Pronunciation & Listening' },
        7: { page: 18, skill: 'Writing & Vocabulary' },
        8: { page: 19, skill: 'Project & Writing' },
      },
    },
    3: {
      title: 'Mini-Olympics',
      emoji: '🏃',
      pageStart: 20, pageEnd: 27,
      periods: {
        1: { page: 20, skill: 'Vocabulary' },
        2: { page: 21, skill: 'Reading comprehension' },
        3: { page: 22, skill: 'Reading comprehension' },
        4: { page: 23, skill: 'Reading comprehension' },
        5: { page: 24, skill: 'Vocabulary & Listening' },
        6: { page: 25, skill: 'Pronunciation & Listening' },
        7: { page: 26, skill: 'Writing' },
        8: { page: 27, skill: 'Project & Writing' },
      },
    },
    4: {
      title: 'Holidays in Palestine',
      emoji: '🎉',
      pageStart: 28, pageEnd: 35,
      periods: {
        1: { page: 28, skill: 'Reading comprehension' },
        2: { page: 29, skill: 'Reading comprehension' },
        3: { page: 30, skill: 'Pronunciation & Listening' },
        4: { page: 31, skill: 'Reading comprehension' },
        5: { page: 32, skill: 'Listening' },
        6: { page: 33, skill: 'Pronunciation & Listening' },
        7: { page: 34, skill: 'Writing' },
        8: { page: 35, skill: 'Project & Writing' },
      },
    },
  },
  6: {
    1: {
      title: 'My summer holiday',
      emoji: '🏖️',
      pageStart: 4, pageEnd: 11,
      periods: {
        1: { page: 4, skill: 'Reading comprehension' },
        2: { page: 5, skill: 'Reading comprehension' },
        3: { page: 6, skill: 'Reading comprehension' },
        4: { page: 7, skill: 'Vocabulary & Listening' },
        5: { page: 8, skill: 'Writing' },
        6: { page: 9, skill: 'Listening' },
        7: { page: 10, skill: 'Writing & Vocabulary' },
        8: { page: 11, skill: 'Project & Writing' },
      },
    },
    2: {
      title: 'Good friends',
      emoji: '👫',
      pageStart: 12, pageEnd: 19,
      periods: {
        1: { page: 12, skill: 'Reading comprehension' },
        2: { page: 13, skill: 'Listening' },
        3: { page: 14, skill: 'Writing' },
        4: { page: 15, skill: 'Grammar' },
        5: { page: 16, skill: 'Listening' },
        6: { page: 17, skill: 'Pronunciation & Listening' },
        7: { page: 18, skill: 'Writing & Vocabulary' },
        8: { page: 19, skill: 'Project & Writing' },
      },
    },
    3: {
      title: 'Summer adventures',
      emoji: '🏕️',
      pageStart: 20, pageEnd: 27,
      periods: {
        1: { page: 20, skill: 'Reading comprehension' },
        2: { page: 21, skill: 'Reading comprehension' },
        3: { page: 22, skill: 'Writing' },
        4: { page: 23, skill: 'Grammar' },
        5: { page: 24, skill: 'Grammar' },
        6: { page: 25, skill: 'Pronunciation & Listening' },
        7: { page: 26, skill: 'Writing' },
        8: { page: 27, skill: 'Project & Writing' },
      },
    },
    4: {
      title: 'Films I like',
      emoji: '🎬',
      pageStart: 28, pageEnd: 35,
      periods: {
        1: { page: 28, skill: 'Vocabulary & Listening' },
        2: { page: 29, skill: 'Listening' },
        3: { page: 30, skill: 'Reading comprehension' },
        4: { page: 31, skill: 'Grammar' },
        5: { page: 32, skill: 'Writing' },
        6: { page: 33, skill: 'Reading comprehension' },
        7: { page: 34, skill: 'Grammar' },
        8: { page: 35, skill: 'Project & Writing' },
      },
    },
  },
  7: {
    1: {
      title: 'Oh, hello!',
      emoji: '👋',
      pageStart: 4, pageEnd: 11,
      periods: {
        1: { page: 4, skill: 'Reading comprehension' },
        2: { page: 5, skill: 'Vocabulary' },
        3: { page: 6, skill: 'Reading comprehension' },
        4: { page: 7, skill: 'Pronunciation & Listening' },
        5: { page: 8, skill: 'Grammar' },
        6: { page: 9, skill: 'Listening' },
        7: { page: 10, skill: 'Reading comprehension' },
        8: { page: 11, skill: 'Project & Speaking' },
      },
    },
    2: {
      title: 'World languages',
      emoji: '🌍',
      pageStart: 12, pageEnd: 19,
      periods: {
        1: { page: 12, skill: 'Reading comprehension' },
        2: { page: 13, skill: 'Listening' },
        3: { page: 14, skill: 'Reading comprehension' },
        4: { page: 15, skill: 'Pronunciation & Listening' },
        5: { page: 16, skill: 'Grammar' },
        6: { page: 17, skill: 'Listening' },
        7: { page: 18, skill: 'Writing' },
        8: { page: 19, skill: 'Project & Speaking' },
      },
    },
    3: {
      title: 'Animal magic',
      emoji: '🐾',
      pageStart: 20, pageEnd: 27,
      periods: {
        1: { page: 20, skill: 'Reading comprehension' },
        2: { page: 21, skill: 'Reading comprehension' },
        3: { page: 22, skill: 'Reading comprehension' },
        4: { page: 23, skill: 'Pronunciation & Listening' },
        5: { page: 24, skill: 'Grammar' },
        6: { page: 25, skill: 'Writing' },
        7: { page: 26, skill: 'Grammar' },
        8: { page: 27, skill: 'Project & Speaking' },
      },
    },
  },
  8: {
    1: {
      title: 'Hello World!',
      emoji: '🌐',
      pageStart: 10, pageEnd: 18,
      periods: {
        1: { skill: 'Vocabulary & Listening' },
        2: { skill: 'Listening & Reading' },
        3: { skill: 'Grammar' },
        4: { skill: 'Vocabulary' },
        5: { skill: 'Reading comprehension' },
        6: { skill: 'Reading & Speaking' },
        7: { skill: 'Vocabulary' },
        8: { skill: 'Grammar' },
        9: { skill: 'Grammar' },
        10: { skill: 'Listening & Pronunciation' },
        11: { skill: 'Writing' },
        12: { skill: 'Writing' },
      },
    },
    2: {
      title: 'A taste of Palestinian culture',
      emoji: '🍽️',
      pageStart: 19, pageEnd: 26,
      periods: {
        1: { skill: 'Vocabulary & Listening' },
        2: { skill: 'Listening & Reading' },
        3: { skill: 'Grammar' },
        4: { skill: 'Vocabulary & Listening' },
        5: { skill: 'Reading comprehension' },
        6: { skill: 'Reading comprehension' },
        7: { skill: 'Vocabulary' },
        8: { skill: 'Grammar' },
        9: { skill: 'Grammar' },
        10: { skill: 'Poem & Vocabulary' },
        11: { skill: 'Writing' },
        12: { skill: 'Writing' },
      },
    },
    3: {
      title: 'Going to a National Park',
      emoji: '🏞️',
      pageStart: 27, pageEnd: 35,
      periods: {
        1: { skill: 'Vocabulary & Listening' },
        2: { skill: 'Listening & Speaking' },
        3: { skill: 'Grammar' },
        4: { skill: 'Vocabulary' },
        5: { skill: 'Reading comprehension' },
        6: { skill: 'Reading comprehension' },
        7: { skill: 'Vocabulary' },
        8: { skill: 'Grammar' },
        9: { skill: 'Grammar' },
        10: { skill: 'Listening & Pronunciation' },
        11: { skill: 'Writing' },
        12: { skill: 'Writing' },
      },
    },
    10: {
      title: 'Back home in Palestine',
      emoji: '🏡',
      pageStart: 89, pageEnd: 97,
      periods: {
        5: { skill: 'Reading comprehension' },
        7: { skill: 'Vocabulary — word families' },
      },
    },
    12: {
      title: 'Finding out about names',
      emoji: '📛',
      pageStart: 107, pageEnd: 116,
      periods: {
        7: { skill: 'Vocabulary — word pairs & dictionary' },
        8: { skill: 'Grammar — reported questions' },
        11: { skill: 'Writing — formal letter' },
        12: { skill: 'Writing — formal letter' },
      },
    },
    13: {
      title: 'When Islam came to Spain',
      emoji: '🕌',
      pageStart: 117, pageEnd: 125,
      periods: {
        1: { skill: 'Vocabulary & Listening' },
      },
    },
  },
  9: {
    1: {
      title: 'Getting to Palestine',
      emoji: '✈️',
      pageStart: 4, pageEnd: 15,
      periods: {
        1: { page: 4, skill: 'Vocabulary & Listening' },
        2: { page: 5, skill: 'Listening & Speaking' },
        3: { page: 6, skill: 'Grammar' },
        4: { page: 7, skill: 'Vocabulary' },
        5: { page: 8, skill: 'Reading comprehension' },
        6: { page: 9, skill: 'Reading & Speaking' },
        7: { page: 10, skill: 'Grammar' },
        8: { page: 11, skill: 'Grammar' },
        9: { page: 12, skill: 'Grammar' },
        10: { page: 13, skill: 'Listening & Pronunciation' },
        11: { page: 14, skill: 'Writing' },
        12: { page: 15, skill: 'Writing' },
      },
    },
    2: {
      title: 'I feel at home already!',
      emoji: '🏠',
      pageStart: 16, pageEnd: 27,
      periods: {
        1: { page: 16, skill: 'Vocabulary & Listening' },
        2: { page: 17, skill: 'Listening & Speaking' },
        3: { page: 18, skill: 'Grammar' },
        4: { page: 19, skill: 'Vocabulary' },
        5: { page: 20, skill: 'Reading comprehension' },
        6: { page: 21, skill: 'Reading comprehension' },
        7: { page: 22, skill: 'Vocabulary' },
        8: { page: 23, skill: 'Grammar' },
        9: { page: 24, skill: 'Grammar' },
        10: { page: 25, skill: 'Poem & Vocabulary' },
        11: { page: 26, skill: 'Writing' },
        12: { page: 27, skill: 'Writing' },
      },
    },
    3: {
      title: 'Be fit, but be safe',
      emoji: '💪',
      pageStart: 28, pageEnd: 39,
      periods: {
        1: { page: 28, skill: 'Vocabulary & Listening' },
        2: { page: 29, skill: 'Listening & Speaking' },
        3: { page: 30, skill: 'Grammar' },
        4: { page: 31, skill: 'Vocabulary & Listening' },
        5: { page: 32, skill: 'Reading comprehension' },
        6: { page: 33, skill: 'Reading comprehension' },
        7: { page: 34, skill: 'Vocabulary' },
        8: { page: 35, skill: 'Grammar' },
        9: { page: 36, skill: 'Writing' },
        10: { page: 37, skill: 'Listening & Pronunciation' },
        11: { page: 38, skill: 'Writing' },
        12: { page: 39, skill: 'Writing' },
      },
    },
    10: {
      title: 'Wildlife in danger',
      emoji: '🐋',
      pageStart: 28, pageEnd: 39,
      periods: {
        5: { page: 32, skill: 'Reading comprehension' },
      },
    },
    12: {
      title: 'Be happy!',
      emoji: '😊',
      pageStart: 52, pageEnd: 63,
      periods: {
        4: { page: 55, skill: 'Vocabulary' },
        7: { page: 58, skill: 'Grammar — prepositions' },
        8: { page: 59, skill: 'Grammar — connectors of cause & result' },
      },
    },
  },
};

export const getUnitMeta = (grade, unit) =>
  PALBOOK_META?.[Number(grade)]?.[Number(unit)] || null;

export const getPeriodMeta = (grade, unit, period) =>
  getUnitMeta(grade, unit)?.periods?.[Number(period)] || null;
