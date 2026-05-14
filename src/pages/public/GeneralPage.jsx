import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter } from 'react-icons/fi';
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
  const [filter, setFilter] = useState('all');
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

  const filtered = lessons.filter((l) => {
    const term = search.toLowerCase();
    const matchesSearch =
      !term ||
      l.title?.toLowerCase().includes(term) ||
      l.titleAr?.includes(search) ||
      l.description?.toLowerCase().includes(term);
    const matchesFilter = filter === 'all' || l.subsection === filter;
    return matchesSearch && matchesFilter;
  });

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

      {/* Search & filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <FiSearch className="absolute top-1/2 -translate-y-1/2 start-4 text-slate-400" />
          <input
            type="text"
            placeholder={t('common.search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input ps-12"
          />
        </div>
        <div className="flex gap-2">
          {['all', GENERAL_SUBSECTIONS.GRAMMAR, GENERAL_SUBSECTIONS.PRONUNCIATION].map(
            (f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-2xl font-semibold text-sm transition-all ${
                  filter === f
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-kid'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-700'
                }`}
              >
                {f === 'all'
                  ? t('common.all')
                  : f === GENERAL_SUBSECTIONS.GRAMMAR
                  ? t('general.grammar')
                  : t('general.pronunciation')}
              </button>
            )
          )}
        </div>
      </div>

      {/* Featured cards */}
      {filter === 'all' && !search && (
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {[
            {
              key: 'grammar',
              emoji: '📝',
              title: t('general.grammar'),
              desc: t('general.grammarDesc'),
              gradient: 'from-primary-500 to-primary-600',
            },
            {
              key: 'pronunciation',
              emoji: '🗣️',
              title: t('general.pronunciation'),
              desc: t('general.pronunciationDesc'),
              gradient: 'from-secondary-500 to-secondary-600',
            },
          ].map((item) => (
            <motion.button
              key={item.key}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFilter(item.key)}
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${item.gradient} text-white p-8 text-start shadow-kid`}
            >
              <div className="text-6xl mb-3">{item.emoji}</div>
              <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
              <p className="text-white/90">{item.desc}</p>
              <div className="mt-4 inline-block px-4 py-2 rounded-xl bg-white/20 backdrop-blur text-sm font-semibold">
                {lessons.filter((l) => l.subsection === item.key).length} lessons →
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {loading ? (
        <Loader />
      ) : filtered.length === 0 ? (
        <EmptyState
          emoji="📭"
          title={t('general.noLessons')}
          message="The teacher will add lessons soon. Stay tuned!"
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((l, i) => (
            <LessonCard key={l.id} lesson={l} index={i} onOpen={setActiveLesson} />
          ))}
        </div>
      )}

      {activeLesson && (
        <LessonViewer lesson={activeLesson} onClose={() => setActiveLesson(null)} />
      )}
    </PageTransition>
  );
};

export default GeneralPage;
