// Printable worksheets (PDF + HTML) served from /public/worksheets.
// Each topic groups three graded levels. Files are produced in the
// "T. Wad Refae" notebook design system (see /worksheets source folder).

export const WORKSHEET_TOPICS = [
  {
    id: 'present-simple',
    titleEn: 'Present Simple',
    titleAr: 'المضارع البسيط',
    emoji: '📘',
    grad: 'g-blue',
    levels: [
      {
        level: 1,
        en: 'Foundation — habits & routines, third-person -s, do/does',
        ar: 'تأسيسي — العادات والروتين، الـ‎-s للمفرد الغائب، do/does',
        pdf: '/worksheets/present-simple-1.pdf',
        html: '/worksheets/present-simple-1.html',
      },
      {
        level: 2,
        en: 'Facts & state verbs — general truths and like / know / want',
        ar: 'الحقائق وأفعال الحالة — الحقائق العامة و like / know / want',
        pdf: '/worksheets/present-simple-2.pdf',
        html: '/worksheets/present-simple-2.html',
      },
      {
        level: 3,
        en: 'Timetables & fixed schedules + time prepositions',
        ar: 'الجداول والمواعيد الثابتة + حروف الجر الزمنية',
        pdf: '/worksheets/present-simple-3.pdf',
        html: '/worksheets/present-simple-3.html',
      },
    ],
  },
  {
    id: 'present-continuous',
    titleEn: 'Present Continuous',
    titleAr: 'المضارع المستمر',
    emoji: '📗',
    grad: 'g-olive',
    levels: [
      {
        level: 1,
        en: 'Foundation — actions happening now',
        ar: 'أساسي — أحداث تجري الآن',
        pdf: '/worksheets/present-continuous-1.pdf',
        html: '/worksheets/present-continuous-1.html',
      },
      {
        level: 2,
        en: 'Negative, question & a changing situation',
        ar: 'النفي والسؤال وموقف يتغيّر الآن',
        pdf: '/worksheets/present-continuous-2.pdf',
        html: '/worksheets/present-continuous-2.html',
      },
      {
        level: 3,
        en: 'wh-questions, state verbs & future arrangements',
        ar: 'أسئلة wh، الأفعال الساكنة، والترتيبات المستقبلية',
        pdf: '/worksheets/present-continuous-3.pdf',
        html: '/worksheets/present-continuous-3.html',
      },
    ],
  },
  {
    id: 'past-simple',
    titleEn: 'Past Simple',
    titleAr: 'الماضي البسيط',
    emoji: '📙',
    grad: 'g-blue',
    levels: [
      {
        level: 1,
        en: 'Foundation — regular verbs (-ed) & past routines',
        ar: 'تأسيسي — الأفعال المنتظمة (-ed) والروتين الماضي',
        pdf: '/worksheets/past-simple-1.pdf',
        html: '/worksheets/past-simple-1.html',
      },
      {
        level: 2,
        en: 'Irregular verbs — went, ate, saw…',
        ar: 'الأفعال الشاذة — went, ate, saw…',
        pdf: '/worksheets/past-simple-2.pdf',
        html: '/worksheets/past-simple-2.html',
      },
      {
        level: 3,
        en: 'Negatives, questions (did / didn\'t) & was / were',
        ar: 'النفي والسؤال (did / didn\'t) و was / were والسرد',
        pdf: '/worksheets/past-simple-3.pdf',
        html: '/worksheets/past-simple-3.html',
      },
    ],
  },
  {
    id: 'future',
    titleEn: 'Future',
    titleAr: 'المستقبل',
    emoji: '🔮',
    grad: 'g-olive',
    levels: [
      {
        level: 1,
        en: "Foundation — 'will': predictions, promises & decisions",
        ar: 'تأسيسي — will: تنبؤات ووعود وقرارات لحظية',
        pdf: '/worksheets/future-1.pdf',
        html: '/worksheets/future-1.html',
      },
      {
        level: 2,
        en: "'be going to' — plans, intentions & evidence",
        ar: 'be going to — خطط ونوايا وتنبؤ بدليل',
        pdf: '/worksheets/future-2.pdf',
        html: '/worksheets/future-2.html',
      },
      {
        level: 3,
        en: 'will vs be going to + wh-questions',
        ar: 'الاختيار بين will و be going to + أسئلة wh',
        pdf: '/worksheets/future-3.pdf',
        html: '/worksheets/future-3.html',
      },
    ],
  },
  {
    id: 'question-words',
    titleEn: 'Wh- Questions',
    titleAr: 'أدوات الاستفهام',
    emoji: '❓',
    grad: 'g-blue',
    levels: [
      {
        level: 1,
        en: 'Foundation — who, what, where, when, why, how',
        ar: 'تأسيسي — أدوات الاستفهام الستّ وما تسأل عنه',
        pdf: '/worksheets/question-words-1.pdf',
        html: '/worksheets/question-words-1.html',
      },
      {
        level: 2,
        en: 'Forming wh- questions across tenses',
        ar: 'تكوين الأسئلة عبر الأزمنة (be / do / did / will)',
        pdf: '/worksheets/question-words-2.pdf',
        html: '/worksheets/question-words-2.html',
      },
      {
        level: 3,
        en: 'How many/much, Which, Whose & subject questions',
        ar: 'How many/much، Which، Whose وأسئلة الفاعل والمفعول',
        pdf: '/worksheets/question-words-3.pdf',
        html: '/worksheets/question-words-3.html',
      },
    ],
  },
  {
    id: 'conditionals',
    titleEn: 'Conditionals (If)',
    titleAr: 'الجمل الشرطية (If)',
    emoji: '🔗',
    grad: 'g-olive',
    // cards show "Type 0/1/2/3" instead of "Level"
    badge: 'type',
    levels: [
      {
        level: 0,
        en: 'Zero — general truths & facts',
        ar: 'الصفرية — الحقائق العامة والعلمية',
        pdf: '/worksheets/conditionals-0.pdf',
        html: '/worksheets/conditionals-0.html',
      },
      {
        level: 1,
        en: 'First — real future possibility',
        ar: 'الأولى — المستقبل الممكن',
        pdf: '/worksheets/conditionals-1.pdf',
        html: '/worksheets/conditionals-1.html',
      },
      {
        level: 2,
        en: 'Second — unreal / imaginary present',
        ar: 'الثانية — الخيال والافتراض في الحاضر',
        pdf: '/worksheets/conditionals-2.pdf',
        html: '/worksheets/conditionals-2.html',
      },
      {
        level: 3,
        en: 'Third — unreal past & regrets',
        ar: 'الثالثة — الماضي الخيالي والندم',
        pdf: '/worksheets/conditionals-3.pdf',
        html: '/worksheets/conditionals-3.html',
      },
    ],
  },
];

export default WORKSHEET_TOPICS;
