// Lightweight, offline search index built from the app's static content:
// General section pages, General lessons (grammar / reading / writing),
// PalBook curriculum lessons, and the printable worksheets.
import { WORKSHEET_TOPICS } from './worksheets';
import { PALBOOK_LESSONS } from './palbookLessons';
import { GRAMMAR_LESSONS } from './grammarLessons';
import { READING_LESSONS } from './readingLessons';
import { WRITING_LESSONS } from './writingLessons';

// lesson.subsection -> /general/<slug>
const SUB_SLUG = {
  grammar: 'grammar',
  pronunciation: 'phonics',
  reading: 'reading',
  writing: 'writing',
};

const items = [];

// General section pages (the whole General area)
[
  ['/general', 'General', 'الدروس العامة', '📘'],
  ['/general/grammar', 'Grammar', 'القواعد', '📝'],
  ['/general/phonics', 'Phonics', 'الصوتيات', '🔤'],
  ['/general/reading', 'Reading', 'القراءة', '📖'],
  ['/general/writing', 'Writing', 'الكتابة', '✍️'],
].forEach(([to, titleEn, titleAr, emoji]) =>
  items.push({ type: 'section', typeEn: 'Section', typeAr: 'قسم', titleEn, titleAr, emoji, to })
);

// General lessons served statically (grammar + reading + writing)
[...GRAMMAR_LESSONS, ...READING_LESSONS, ...WRITING_LESSONS].forEach((l) => {
  const slug = SUB_SLUG[l.subsection] || 'grammar';
  items.push({
    type: 'lesson',
    typeEn: 'General',
    typeAr: 'عام',
    titleEn: l.title,
    titleAr: l.titleAr,
    emoji: l.thumbnail || '📝',
    to: `/general/${slug}?lesson=${encodeURIComponent(l.id)}`,
  });
});

// PalBook curriculum lessons (الدروس)
PALBOOK_LESSONS.forEach((l) => {
  items.push({
    type: 'lesson',
    typeEn: 'PalBook',
    typeAr: 'درس',
    titleEn: l.title,
    titleAr: l.titleAr,
    emoji: l.thumbnail || '📒',
    to: `/palbook?grade=${l.grade}&unit=${l.unit}&lesson=${encodeURIComponent(l.id)}`,
  });
});

// Printable worksheets
WORKSHEET_TOPICS.forEach((topic) => {
  topic.levels.forEach((lv) => {
    items.push({
      type: 'worksheet',
      typeEn: 'Worksheet',
      typeAr: 'ورقة عمل',
      titleEn: `${topic.titleEn} — Level ${lv.level}`,
      titleAr: `${topic.titleAr} — المستوى ${lv.level}`,
      emoji: topic.emoji,
      href: lv.pdf,
      external: true,
    });
  });
});

export const SEARCH_INDEX = items;

// Matches English (case-insensitive) and Arabic titles.
export function searchContent(query, limit = 8) {
  const raw = query.trim();
  if (!raw) return [];
  const q = raw.toLowerCase();
  return SEARCH_INDEX.filter(
    (it) => it.titleEn.toLowerCase().includes(q) || it.titleAr.includes(raw)
  ).slice(0, limit);
}

export default SEARCH_INDEX;
