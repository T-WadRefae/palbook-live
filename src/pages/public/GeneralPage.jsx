import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../../components/common/PageTransition';
import Loader from '../../components/common/Loader';
import { getLessons } from '../../firebase/lessons';
import { GRAMMAR_LESSONS } from '../../data/grammarLessons';
import { READING_LESSONS } from '../../data/readingLessons';
import { WRITING_LESSONS } from '../../data/writingLessons';
import { GENERAL_SECTION_LIST } from '../../data/generalSections';

// Static lessons served from palbook-lessons GitHub Pages (grammar + reading + writing).
// Counted here so each chooser card shows its real lesson total.
const STATIC_LESSONS = [...GRAMMAR_LESSONS, ...READING_LESSONS, ...WRITING_LESSONS];

// Landing page for the General section: shows a chooser card per sub-page.
// Each card links to its own route (/general/grammar, /general/phonics, ...).
const GeneralPage = () => {
  const { t } = useTranslation();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const countForSubsection = (sub) =>
    lessons.filter((l) => l.subsection === sub).length;

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

      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center">
            {t('general.chooseSection')}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {GENERAL_SECTION_LIST.map((card, i) => {
              const count = countForSubsection(card.subsection);
              return (
                <motion.div
                  key={card.slug}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={`/general/${card.slug}`}
                    className={`${i % 2 === 0 ? 'g-blue' : 'g-olive'} w-40 sm:w-44 aspect-square rounded-3xl shadow-kid flex flex-col items-center justify-center font-extrabold relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    <div className="text-4xl mb-1 relative">{card.emoji}</div>
                    <div className="text-base relative text-center px-2 leading-tight">
                      {t(card.titleKey)}
                    </div>
                    <div className="text-xs mt-1 px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/15 backdrop-blur relative">
                      {count} {count === 1 ? t('general.lesson') : t('general.lessons')}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </>
      )}
    </PageTransition>
  );
};

export default GeneralPage;
