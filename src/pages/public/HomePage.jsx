import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiBookOpen, FiPlayCircle, FiAward, FiGlobe, FiArrowRight } from 'react-icons/fi';
import PageTransition from '../../components/common/PageTransition';
import { useAuth } from '../../contexts/AuthContext';

const HomePage = () => {
  const { t } = useTranslation();
  const { isAuthenticated, isTeacher } = useAuth();

  const features = [
    {
      icon: <FiBookOpen className="text-3xl" />,
      title: t('home.feature1Title'),
      desc: t('home.feature1Desc'),
      gradient: 'from-primary-400 to-primary-600',
      emoji: '📚',
    },
    {
      icon: <FiPlayCircle className="text-3xl" />,
      title: t('home.feature2Title'),
      desc: t('home.feature2Desc'),
      gradient: 'from-secondary-400 to-secondary-600',
      emoji: '🎮',
    },
    {
      icon: <FiGlobe className="text-3xl" />,
      title: t('home.feature3Title'),
      desc: t('home.feature3Desc'),
      gradient: 'from-accent-400 to-accent-500',
      emoji: '🌍',
    },
    {
      icon: <FiAward className="text-3xl" />,
      title: t('home.feature4Title'),
      desc: t('home.feature4Desc'),
      gradient: 'from-purple-400 to-pink-500',
      emoji: '🏆',
    },
  ];

  const stats = [
    { value: '500+', label: t('home.stats.students'), emoji: '🎓' },
    { value: '100+', label: t('home.stats.lessons'), emoji: '📖' },
    { value: '4', label: t('home.stats.games'), emoji: '🎯' },
    { value: '2', label: t('home.stats.languages'), emoji: '🌐' },
  ];

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative overflow-hidden pal-pattern">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-white to-secondary-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />

        {/* Decorative blobs */}
        <div className="absolute top-20 -start-20 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 -end-20 w-72 h-72 bg-secondary-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-pal text-white text-sm font-bold shadow-soft">
                🇵🇸 by T. Wad Refae
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-extrabold mt-4 leading-tight text-balance">
                {t('home.welcome')} <span className="gradient-text">📚✨</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
                {t('home.subtitle')}
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                {!isAuthenticated && (
                  <Link to="/palbook" className="btn-primary !text-base !px-7">
                    {t('home.startLearning')} <FiArrowRight className="rtl-flip" />
                  </Link>
                )}
                {isAuthenticated && (
                  <Link
                    to={isTeacher ? '/teacher' : '/student'}
                    className="btn-primary !text-base !px-7"
                  >
                    {t('nav.dashboard')} <FiArrowRight className="rtl-flip" />
                  </Link>
                )}
                <Link to="/palbook" className="btn-outline !text-base !px-7">
                  {t('home.exploreLessons')}
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-12">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="text-center p-3 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur border border-white/50 shadow-soft"
                  >
                    <div className="text-2xl mb-1">{s.emoji}</div>
                    <div className="font-extrabold text-xl gradient-text">{s.value}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Hero illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Floating cards */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-0 start-0 w-32 h-32 rounded-3xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-6xl shadow-kid"
                >
                  📚
                </motion.div>
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                  className="absolute top-10 end-0 w-32 h-32 rounded-3xl bg-gradient-to-br from-accent-400 to-accent-500 flex items-center justify-center text-6xl shadow-glow"
                >
                  🎯
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute bottom-10 start-10 w-32 h-32 rounded-3xl bg-gradient-to-br from-secondary-400 to-secondary-600 flex items-center justify-center text-6xl shadow-lg"
                >
                  🎮
                </motion.div>
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity }}
                  className="absolute bottom-0 end-10 w-32 h-32 rounded-3xl bg-gradient-pal flex items-center justify-center text-6xl shadow-kid"
                >
                  🇵🇸
                </motion.div>
                {/* Center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full bg-white dark:bg-slate-800 shadow-2xl flex items-center justify-center text-7xl animate-pulse">
                    🌟
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-extrabold gradient-text mb-3">
            ✨ Why PalBook Live?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Crafted with love by T. Wad Refae for Palestinian students learning English
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="card group cursor-pointer"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.gradient} text-white flex items-center justify-center mb-4 shadow-kid group-hover:scale-110 transition-transform`}
              >
                <span className="text-3xl">{f.emoji}</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-800 dark:text-white">
                {f.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-gradient-pal p-8 md:p-12 text-white text-center shadow-2xl"
        >
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
          <div className="relative">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
              Ready to start your journey?
            </h2>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              Join hundreds of Palestinian students mastering English the fun way!
            </p>
            <Link
              to="/palbook"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-primary-600 font-bold text-lg shadow-2xl hover:scale-105 transition-transform"
            >
              {isAuthenticated ? t('home.exploreLessons') : t('home.startLearning')}
              <FiArrowRight className="rtl-flip" />
            </Link>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  );
};

export default HomePage;
