import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiBookOpen, FiPlayCircle, FiAward, FiGlobe } from 'react-icons/fi';
import PageTransition from '../../components/common/PageTransition';

const HERO_IMAGE = 'https://i.ibb.co/p6QNWhzG/c04b1a3e-8374-451d-b195-7524b7e041cd-20260515-160245-0000.png';

const HomePage = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <FiBookOpen className="text-3xl" />,
      title: t('home.feature1Title'),
      desc: t('home.feature1Desc'),
      gradient: 'from-pastel-blue to-pastel-skyblue',
      emoji: '📚',
    },
    {
      icon: <FiPlayCircle className="text-3xl" />,
      title: t('home.feature2Title'),
      desc: t('home.feature2Desc'),
      gradient: 'from-pastel-mint to-pastel-green',
      emoji: '🎮',
    },
    {
      icon: <FiGlobe className="text-3xl" />,
      title: t('home.feature3Title'),
      desc: t('home.feature3Desc'),
      gradient: 'from-pastel-cream to-pastel-peach',
      emoji: '🌍',
    },
    {
      icon: <FiAward className="text-3xl" />,
      title: t('home.feature4Title'),
      desc: t('home.feature4Desc'),
      gradient: 'from-pastel-coral to-pastel-pink',
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
        <div className="absolute inset-0 bg-gradient-to-br from-pastel-skyblue/30 via-white to-pastel-mint/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />

        <div className="absolute top-20 -start-20 w-72 h-72 bg-pastel-blue/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 -end-20 w-72 h-72 bg-pastel-mint/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

        <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-8 items-center">

            {/* Text side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1 text-center lg:text-start"
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

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
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

            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 relative flex items-center justify-center"
            >
              <motion.img
                src={HERO_IMAGE}
                alt="PalBook Live - Palestinian children learning"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full max-w-md drop-shadow-2xl"
                loading="eager"
              />
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
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.gradient} text-slate-700 flex items-center justify-center mb-4 shadow-kid group-hover:scale-110 transition-transform`}
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
    </PageTransition>
  );
};

export default HomePage;