import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiSearch } from 'react-icons/fi';
import PageTransition from '../../components/common/PageTransition';
import LessonCard from '../../components/common/LessonCard';
import LessonViewer from '../../components/common/LessonViewer';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import { getLessons } from '../../firebase/lessons';

const GamesPage = () => {
  const { t } = useTranslation();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeGame, setActiveGame] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getLessons({ section: 'games' });
        setGames(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = games.filter((g) => {
    if (!search) return true;
    const term = search.toLowerCase();
    return (
      g.title?.toLowerCase().includes(term) ||
      g.titleAr?.includes(search) ||
      g.description?.toLowerCase().includes(term)
    );
  });

  return (
    <PageTransition className="max-w-7xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="text-7xl mb-3 animate-wiggle inline-block">🎮</div>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold gradient-text">
          {t('games.title')}
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">
          {t('games.subtitle')} • by T. Wad Refae
        </p>
      </motion.div>

      {/* Search */}
      {(games.length > 0 || search) && (
        <div className="relative mb-8 max-w-xl mx-auto">
          <FiSearch className="absolute top-1/2 -translate-y-1/2 start-4 text-slate-400" />
          <input
            type="text"
            placeholder={t('common.search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input ps-12"
          />
        </div>
      )}

      {loading ? (
        <Loader />
      ) : filtered.length === 0 ? (
        <EmptyState
          emoji="🎮"
          title={search ? t('common.noResults') : t('games.noGames')}
          message={search ? '' : 'The teacher will add games soon. Stay tuned!'}
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((g, i) => (
            <LessonCard
              key={g.id}
              lesson={g}
              index={i}
              onOpen={setActiveGame}
            />
          ))}
        </div>
      )}

      {activeGame && (
        <LessonViewer lesson={activeGame} onClose={() => setActiveGame(null)} />
      )}
    </PageTransition>
  );
};

export default GamesPage;