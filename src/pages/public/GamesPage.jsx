import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PageTransition from '../../components/common/PageTransition';

const GamesPage = () => {
  const { t } = useTranslation();

 
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

      <div className="grid sm:grid-cols-2 gap-6">
        {games.map((g, i) => (
          <motion.div
            key={g.to}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <Link
              to={g.to}
              className={`block relative overflow-hidden rounded-3xl bg-gradient-to-br ${g.gradient} text-white p-8 shadow-kid h-full`}
            >
              <div className="absolute -top-10 -end-10 w-40 h-40 bg-white/10 rounded-full" />
              <div className="a
              bsolute -bottom-10 -start-10 w-32 h-32 bg-white/10 rounded-full" />

              <div className="relative">
                <div className="text-7xl mb-4 transform group-hover:scale-110 transition-transform">
                  {g.emoji}
                </div>
                <h3 className="text-2xl font-bold mb-2">{g.title}</h3>
                <p className="text-white/90 mb-4">{g.desc}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/20 backdrop-blur font-bold text-sm">
                  {t('games.play')} →
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </PageTransition>
  );
};

export default GamesPage;
