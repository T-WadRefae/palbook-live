import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import PageTransition from '../../components/common/PageTransition';
import LessonRow from '../../components/common/LessonRow';
import LessonViewer from '../../components/common/LessonViewer';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import { getLessons } from '../../firebase/lessons';
import { GRADES } from '../../utils/constants';

const PalBookPage = () => {
  const { t } = useTranslation();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [grade, setGrade] = useState(null);
  const [unit, setUnit] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const HERO_IMAGE = 'https://i.ibb.co/p6QNWhzG/c04b1a3e-8374-451d-b195-7524b7e041cd-20260515-160245-0000.png';

  useEffect(() => {
    (async () => {
      try {
        const data = await getLessons({ section: 'palbook' });
        setLessons(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Available units for selected grade
  const unitsForGrade = useMemo(() => {
    if (!grade) return [];
    const units = new Set(
      lessons.filter((l) => Number(l.grade) === Number(grade)).map((l) => Number(l.unit))
    );
    return Array.from(units).sort((a, b) => a - b);
  }, [lessons, grade]);

  const lessonsForUnit = useMemo(() => {
    if (!grade || !unit) return [];
    return lessons
      .filter(
        (l) => Number(l.grade) === Number(grade) && Number(l.unit) === Number(unit)
      )
      .sort((a, b) => (Number(a.lesson) || 0) - (Number(b.lesson) || 0));
  }, [lessons, grade, unit]);

  const lessonsCountByGrade = (g) =>
    lessons.filter((l) => Number(l.grade) === Number(g)).length;

  return (
    <PageTransition className="max-w-7xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <div className="text-6xl mb-3 animate-float">🇵🇸</div>
        <h1 className="text-4xl font-display font-extrabold gradient-text">
          {t('palbook.title')}
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">
          {t('palbook.subtitle')} • by T. Wad Refae
        </p>
      </motion.div>

      {/* Breadcrumbs */}
      {(grade || unit) && (
        <div className="flex items-center gap-2 mb-6 text-sm">
          <button
            onClick={() => {
              setGrade(null);
              setUnit(null);
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            🇵🇸 PalBook
          </button>
          {grade && (
            <>
              <span className="text-slate-400">/</span>
              <button
                onClick={() => setUnit(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                {t('palbook.grade')} {grade}
              </button>
            </>
          )}
          {unit && (
            <>
              <span className="text-slate-400">/</span>
              <span className="px-3 py-1.5 rounded-lg bg-primary-100 text-primary-700 font-semibold">
                {t('palbook.unit')} {unit}
              </span>
            </>
          )}
        </div>
      )}

      {loading ? (
        <Loader />
      ) : (
        <AnimatePresence mode="wait">
          {/* Grade selection */}
          {!grade && (
            <motion.div
              key="grades"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center">
                {t('palbook.selectGrade')}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {GRADES.map((g, i) => {
                  const count = lessonsCountByGrade(g);
                  return (
                    <motion.button
                      key={g}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -8, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setGrade(g)}
                      className="aspect-square rounded-3xl bg-gradient-to-br from-primary-500 via-accent-500 to-secondary-500 text-white shadow-kid flex flex-col items-center justify-center font-extrabold relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                      <div className="text-4xl mb-1 relative">📚</div>
                      <div className="text-xs uppercase tracking-wider opacity-80 relative">
                        {t('palbook.grade')}
                      </div>
                      <div className="text-4xl relative">{g}</div>
                      <div className="text-xs mt-1 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur relative">
                        {count} lessons
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Unit selection */}
          {grade && !unit && (
            <motion.div
              key="units"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center">
                {t('palbook.selectUnit')} • {t('palbook.grade')} {grade}
              </h2>
              {unitsForGrade.length === 0 ? (
                <EmptyState
                  emoji="📭"
                  title={t('palbook.noUnits')}
                  action={
                    <button onClick={() => setGrade(null)} className="btn-primary">
                      <FiArrowLeft className="rtl-flip" /> {t('common.back')}
                    </button>
                  }
                />
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {unitsForGrade.map((u, i) => {
                    const count = lessons.filter(
                      (l) => Number(l.grade) === grade && Number(l.unit) === u
                    ).length;
                    const colors = [
                      'from-rose-400 to-pink-600',
                      'from-amber-400 to-orange-600',
                      'from-emerald-400 to-teal-600',
                      'from-sky-400 to-indigo-600',
                      'from-violet-400 to-purple-600',
                      'from-fuchsia-400 to-pink-600',
                    ];
                    const c = colors[i % colors.length];
                    return (
                      <motion.button
                        key={u}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -6, scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setUnit(u)}
                        className={`p-6 rounded-3xl bg-gradient-to-br ${c} text-white shadow-kid text-start`}
                      >
                        <div className="text-4xl mb-2">📖</div>
                        <div className="text-xs uppercase tracking-wider opacity-80">
                          {t('palbook.unit')}
                        </div>
                        <div className="text-3xl font-extrabold">{u}</div>
                        <div className="text-xs mt-2 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur inline-block">
                          {count} lessons
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {/* Lessons */}
          {grade && unit && (
            <motion.div
              key="lessons"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center">
                {t('palbook.selectLesson')} • {t('palbook.grade')} {grade} • {t('palbook.unit')} {unit}
              </h2>
              {lessonsForUnit.length === 0 ? (
                <EmptyState emoji="📭" title={t('palbook.noLessons')} />
              ) : (
                <div className="max-w-3xl mx-auto flex flex-col gap-2.5">
                  {lessonsForUnit.map((l, i) => (
                    <LessonRow
                      key={l.id}
                      lesson={l}
                      index={i}
                      onOpen={setActiveLesson}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {activeLesson && (
        <LessonViewer lesson={activeLesson} onClose={() => setActiveLesson(null)} />
      )}
    </PageTransition>
  );
};

export default PalBookPage;
