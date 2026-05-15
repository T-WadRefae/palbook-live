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

  const subsectionCards = [
    {
      key: GENERAL_SUBSECTIONS.GRAMMAR,
      emoji: '📝',
      title: t('general.grammar'),
      desc: t('general.grammarDesc'),
      gradient: 'from-pastel-coral to-pastel-pink',
    },
    {
      key: GENERAL_SUBSECTIONS.PRONUNCIATION,
      emoji: '🗣️',
      title: t('general.pronunciation'),
      desc: t('general.pronunciationDesc'),
      gradient: 'from-pastel-mint to-pastel-green',
    },
    {
      key: GENERAL_SUBSECTIONS.READING,
      emoji: '📖',
      title: t('general.reading'),
      desc: t('general.readingDesc'),
      gradient: 'from-pastel-blue to-pastel-skyblue',
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
        className="mb-10 text-center"
      >
        <div className="text-6xl mb-3 animate-float">📘</div>
        <h1 className="text-4xl font-display font-extrabold gradient-text">
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
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            📘 {t('general.title')}
          </button>
          <span className="text-slate-400">/</span>
          <span className="px-3 py-1.5 rounded-lg bg-primary-100 text-primary-700 font-semibold">
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

              <div className="grid md:grid-cols-3 gap-6">
                {subsectionCards.map((card, i) => {
                  const count = countForSubsection(card.key);
                  return (
                    <motion.button
                      key={card.key}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -10, scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSubsection(card.key)}
                      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${card.gradient} p-8 text-start shadow-kid group`}
                    >
                      <div className="absolute -top-10 -end-10 w-40 h-40 bg-white/20 rounded-full" />
                      <div className="absolute -bottom-10 -start-10 w-32 h-32 bg-white/10 rounded-full" />

                      <div className="relative">
                        <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                          {card.emoji}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">
                          {card.title}
                        </h3>
                        <p className="text-sm text-slate-700 mb-4">{card.desc}</p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/40 backdrop-blur font-bold text-sm text-slate-800">
                          {count} {count === 1 ? t('general.lesson') : t('general.lessons')}
                          <span>→</span>
                        </div>
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
              <div
                className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${currentCard.gradient} p-6 md:p-8 mb-8 shadow-kid`}
              >
                <div className="absolute -top-10 -end-10 w-40 h-40 bg-white/20 rounded-full" />
                <div className="relative flex items-center gap-4">
                  <div className="text-6xl">{currentCard.emoji}</div>
                  <div>
                    <h2 className="text-3xl font-extrabold text-slate-800">
                      {currentCard.title}
                    </h2>
                    <p className="text-slate-700 text-sm mt-1">{currentCard.desc}</p>
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