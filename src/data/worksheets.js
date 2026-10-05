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
];

export default WORKSHEET_TOPICS;
