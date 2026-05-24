import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiSearch } from 'react-icons/fi';
import PageTransition from '../../components/common/PageTransition';
import LessonCard from '../../components/common/LessonCard';
import LessonViewer from '../../components/common/LessonViewer';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import { getLessons } from '../../firebase/lessons';
import { GENERAL_SUBSECTIONS } from '../../utils/constants';

const GeneralPage = () => {
  const { t } = useTranslation();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [subsection, setSubsection] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getLessons({ section: 'general' });
        setLessons(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    setSearch('');
  }, [subsection]);

  // Same square style as grade buttons, but distinct violet/purple palette
  const subsectionCards = [
    {
      key: GENERAL_SUBSECTIONS.GRAMMAR,
      emoji: '📝',
      title: t('general.grammar'),
    },
    {
      key: GENERAL_SUBSECTIONS.PRONUNCIATION,
      emoji: '🔤',
      title: t('general.pronunciation'),
    },
    {
      key: GENERAL_SUBSECTIONS.READING,
      emoji: '📖',
      title: t('general.reading'),
    },
  ];

  const lessonsForSubsection = useMemo(() => {
    if (!subsection) return [];
    return lessons
      .filter((l) => l.subsection === subsection)
      .filter((l) => {
        if (!search) return true;
        const term = search.toLowerCase();
        return (
          l.title?.toLowerCase().includes(term) ||
          l.titleAr?.includes(search) ||
          l.description?.toLowerCase().includes(term)
        );
      });
  }, [lessons, subsection, search]);

  const countForSubsection = (key) =>
    lessons.filter((l) => l.subsection === key).length;

  const currentCard = subsectionCards.find((c) => c.key === subsection);

  return (
    <PageTransition className="max-w-7xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <div className="text-5xl mb-3 animate-float">📘</div>
        <h1 className="text-3xl font-display font-extrabold gradient-text">
          {t('general.title')}
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">
          {t('general.subtitle')} • by T. Wad Refae
        </p>
      </motion.div>

      {subsection && (
        <div className="flex items-center gap-2 mb-6 text-sm">
          <button
            onClick={() => setSubsection(null)}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            📘 {t('general.title')}
          </button>
          <span className="text-slate-400">/</span>
          <span className="px-3 py-1.5 rounded-lg bg-violet-100 text-violet-700 font-semibold">
            {currentCard?.emoji} {currentCard?.title}
          </span>
        </div>
      )}

      {loading ? (
        <Loader />
      ) : (
        <AnimatePresence mode="wait">
          {!subsection && (
            <motion.div
              key="subsections"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center">
                {t('general.chooseSection')}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {subsectionCards.map((card, i) => {
                  const count = countForSubsection(card.key);
                  return (
                    <motion.button
                      key={card.key}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -8, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSubsection(card.key)}
                      className="aspect-square rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-indigo-500 text-white shadow-kid flex flex-col items-center justify-center font-extrabold relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                      <div className="text-4xl mb-1 relative">{card.emoji}</div>
                      <div className="text-base relative text-center px-2 leading-tight">
                        {card.title}
                      </div>
                      <div className="text-xs mt-1 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur relative">
                        {count} {count === 1 ? t('general.lesson') : t('general.lessons')}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {subsection && (
            <motion.div
              key={`lessons-${subsection}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-indigo-500 p-6 md:p-8 mb-8 shadow-kid">
                <div className="absolute -top-10 -end-10 w-40 h-40 bg-white/20 rounded-full" />
                <div className="relative flex items-center gap-4">
                  <div className="text-5xl">{currentCard.emoji}</div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-white">
                      {currentCard.title}
                    </h2>
                  </div>
                </div>
              </div>

              {lessonsForSubsection.length > 0 || search ? (
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

              {lessonsForSubsection.length === 0 ? (
                <EmptyState
                  emoji="📭"
                  title={t('general.noLessons')}
                  message={
                    search
                      ? t('common.noResults')
                      : 'The teacher will add lessons soon. Stay tuned!'
                  }
                  action={
                    <button
                      onClick={() => setSubsection(null)}
                      className="btn-primary"
                    >
                      <FiArrowLeft className="rtl-flip" /> {t('common.back')}
                    </button>
                  }
                />
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {lessonsForSubsection.map((l, i) => (
                    <LessonCard
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

export default GeneralPage;