import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiBookOpen, FiPlayCircle, FiAward, FiArrowLeft } from 'react-icons/fi';
import PageTransition from '../../components/common/PageTransition';

const HERO_IMAGE = 'https://i.ibb.co/p6QNWhzG/c04b1a3e-8374-451d-b195-7524b7e041cd-20260515-160245-0000.png';

const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const sections = [
    {
      to: '/palbook',
      emoji: '🇵🇸',
      title: 'PalBook Live',
      desc: t('home.palbookDesc'),
      gradient: 'from-pastel-coral to-pastel-pink',
    },
    {
      to: '/general',
      emoji: '✨',
      title: 'General',
      desc: t('home.generalDesc'),
      gradient: 'from-pastel-mint to-pastel-green',
    },
    {
      to: '/games',
      emoji: '🎮',
      title: 'Games',
      desc: t('home.gamesDesc'),
      gradient: 'from-pastel-blue to-pastel-skyblue',
    },
  ];

  const features = [
    {
      title: t('home.feature1Title'),
      desc: t('home.feature1Desc'),
      emoji: '📚',
      gradient: 'from-pastel-blue to-pastel-skyblue',
    },
    {
      title: t('home.feature2Title'),
      desc: t('home.feature2Desc'),
      emoji: '🎮',
      gradient: 'from-pastel-mint to-pastel-green',
    },
    {
      title: t('home.feature3Title'),
      desc: t('home.feature3Desc'),
      emoji: '🌍',
      gradient: 'from-pastel-cream to-pastel-peach',
    },
    {
      title: t('home.feature4Title'),
      desc: t('home.feature4Desc'),
      emoji: '🏆',
      gradient: 'from-pastel-coral to-pastel-pink',
    },
  ];

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pastel-skyblue/30 via-white to-pastel-mint/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />

        <div className="absolute top-20 -start-20 w-72 h-72 bg-pastel-blue/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 -end-20 w-72 h-72 bg-pastel-mint/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

        <div className="relative max-w-7xl mx-auto px-4 py-10 md:py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">

            {/* Text + buttons side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1 text-center lg:text-start"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-pal text-white text-sm font-bold shadow-soft">
                🇵🇸 by T. Wad Refae
              </span>
              <h1 className="text-3xl md:text-5xl font-display font-extrabold mt-4 leading-tight">
                {t('home.welcome')} 
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                {t('home.subtitle')}
              </p>
            </motion.div>

            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 flex items-center justify-center"
            >
              <motion.img
                src={HERO_IMAGE}
                alt="PalBook Live"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full max-w-sm drop-shadow-2xl"
                loading="eager"
              />
            </motion.div>

          </div>

          {/* Section buttons */}
          <div className="relative mt-6">
            <h2 className="text-center text-xl font-bold text-slate-700 dark:text-slate-200 mb-5">
              {t('home.exploreSections')}
            </h2>
            <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {sections.map((s, i) => (
                <motion.button
                  key={s.to}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(s.to)}
                  className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${s.gradient} p-6 text-start shadow-kid group`}
                >
                  <div className="absolute -top-8 -end-8 w-28 h-28 bg-white/20 rounded-full" />
                  <div className="relative">
                    <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                      {s.emoji}
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-1">
                      {s.title}
                    </h3>
                    <p className="text-sm text-slate-700 mb-3">{s.desc}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-slate-800">
                      {t('common.explore')} <FiArrowLeft className="rtl-flip" />
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-extrabold gradient-text mb-2">
            ✨ Why PalBook Live?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {t('home.whyDesc')}
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
              className="card group"
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