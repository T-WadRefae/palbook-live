import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiSearch } from 'react-icons/fi';
import PageTransition from '../common/PageTransition';
import LessonCard from '../common/LessonCard';
import LessonViewer from '../common/LessonViewer';
import Loader from '../common/Loader';
import EmptyState from '../common/EmptyState';
import { getLessons } from '../../firebase/lessons';
import { GRADES } from '../../utils/constants';
import { GRAMMAR_LESSONS } from '../../data/grammarLessons';
import { READING_LESSONS } from '../../data/readingLessons';
import { WRITING_LESSONS } from '../../data/writingLessons';

// Static lessons served from palbook-lessons GitHub Pages (grammar + reading + writing).
// They show in their General sub-page without needing Firestore documents.
const STATIC_LESSONS = [...GRAMMAR_LESSONS, ...READING_LESSONS, ...WRITING_LESSONS];

// Shared view for every General sub-page. Each page (Grammar / Phonics /
// Reading) renders this with its own `section` config from generalSections.js.
const GeneralSection = ({ section }) => {
  const { t } = useTranslation();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState(null); // null = all grades
  const [activeLesson, setActiveLesson] = useState(null);

  const title = t(section.titleKey);

  useEffect(() => {
    (async () => {
      try {
        const data = await getLessons({ section: 'general' });
        // Merge static grammar + reading lessons; Firestore docs take priority (same id wins).
        const firestoreIds = new Set(data.map((l) => l.id));
        const staticFallbacks = STATIC_LESSONS.filter((l) => !firestoreIds.has(l.id));
        setLessons([...data, ...staticFallbacks]);
      } catch (err) {
        console.error(err);
        setLessons(STATIC_LESSONS);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Lessons belonging to this sub-section, ignoring the grade filter —
  // used both for the grade-chip counts and as the base for filtering.
  const subsectionLessons = useMemo(
    () => lessons.filter((l) => l.subsection === section.subsection),
    [lessons, section.subsection]
  );

  const lessonsFiltered = useMemo(() => {
    return subsectionLessons
      .filter((l) => {
        // A lesson can serve several grades, so it shows under each of them.
        if (!gradeFilter) return true;
        return (l.grades || []).includes(gradeFilter);
      })
      .filter((l) => {
        if (!search) return true;
        const term = search.toLowerCase();
        return (
          l.title?.toLowerCase().includes(term) ||
          l.titleAr?.includes(search) ||
          l.description?.toLowerCase().includes(term)
        );
      });
  }, [subsectionLessons, gradeFilter, search]);

  const countForGrade = (g) =>
    subsectionLessons.filter((l) => (l.grades || []).includes(g)).length;

  return (
    <PageTransition className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb back to the General landing */}
      <div className="flex items-center gap-2 mb-6 text-sm">
        <Link
          to="/general"
          className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          📘 {t('general.title')}
        </Link>
        <span className="text-slate-400">/</span>
        <span className="px-3 py-1.5 rounded-lg bg-secondary-100 text-secondary-700 font-semibold">
          {section.emoji} {title}
        </span>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {/* Hero — wide banner image if the section provides one, else emoji */}
          {section.bannerImage ? (
            <div className="relative overflow-hidden rounded-3xl mb-8 shadow-kid">
              <img
                src={section.bannerImage}
                alt={title}
                loading="eager"
                decoding="async"
                className="w-full h-auto block"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
              <h2 className="absolute bottom-4 start-5 end-5 text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg">
                {title}
              </h2>
            </div>
          ) : (
            <div className="g-blue relative overflow-hidden rounded-3xl p-6 md:p-8 mb-8 shadow-kid">
              <div className="absolute -top-10 -end-10 w-40 h-40 bg-white/20 rounded-full" />
              <div className="relative flex items-center gap-4">
                <div className="text-5xl">{section.emoji}</div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">
                    {title}
                  </h2>
                </div>
              </div>
            </div>
          )}

          {/* Grade filter — a lesson tagged with several grades shows under each */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400 me-1">
              {t('general.filterByGrade')}
            </span>
            <button
              onClick={() => setGradeFilter(null)}
              className={`px-4 h-10 rounded-xl font-bold text-sm transition-all ${
                gradeFilter === null
                  ? 'g-blue text-slate-800 shadow-soft'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {t('common.all')}
            </button>
            {GRADES.map((g) => {
              const count = countForGrade(g);
              return (
                <button
                  key={g}
                  onClick={() => setGradeFilter(g)}
                  className={`min-w-10 h-10 px-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-1 ${
                    gradeFilter === g
                      ? 'g-blue text-slate-800 shadow-soft'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {g}
                  {count > 0 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/10 dark:bg-white/15">
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {lessonsFiltered.length > 0 || search ? (
            <div className="relative mb-6">
              <FiSearch className="absolute top-1/2 -translate-y-1/2 start-4 text-slate-400" />
              <input
                type="text"
                placeholder={t('common.search')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input ps-12"
              />
            </div>
          ) : null}

          {lessonsFiltered.length === 0 ? (
            <EmptyState
              emoji="📭"
              title={t('general.noLessons')}
              message={
                search || gradeFilter
                  ? t('common.noResults')
                  : 'The teacher will add lessons soon. Stay tuned!'
              }
              action={
                <Link to="/general" className="btn-primary">
                  <FiArrowLeft className="rtl-flip" /> {t('common.back')}
                </Link>
              }
            />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {lessonsFiltered.map((l, i) => (
                <LessonCard key={l.id} lesson={l} index={i} onOpen={setActiveLesson} />
              ))}
            </div>
          )}
        </motion.div>
      )}

      {activeLesson && (
        <LessonViewer lesson={activeLesson} onClose={() => setActiveLesson(null)} />
      )}
    </PageTransition>
  );
};

export default GeneralSection;
