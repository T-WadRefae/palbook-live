import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiArrowLeft } from 'react-icons/fi';
import PageTransition from '../../components/common/PageTransition';

const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const HERO_IMAGE = '/hero.png';

  const sections = [
    {
      to: '/palbook',
      emoji: '🇵🇸',
      title: 'PalBook Live',
      desc: t('home.palbookDesc'),
      grad: 'g-olive',
    },
    {
      to: '/general',
      emoji: '✨',
      title: 'General',
      desc: t('home.generalDesc'),
      grad: 'g-blue',
    },
    {
      to: '/games',
      emoji: '🎮',
      title: 'Games',
      desc: t('home.gamesDesc'),
      grad: 'g-olive',
    },
  ];

  const features = [
    { emoji: '📚', title: t('home.feature1Title'), desc: t('home.feature1Desc'), grad: 'g-blue' },
    { emoji: '🎮', title: t('home.feature2Title'), desc: t('home.feature2Desc'), grad: 'g-olive' },
    { emoji: '🌍', title: t('home.feature3Title'), desc: t('home.feature3Desc'), grad: 'g-blue' },
    { emoji: '🏆', title: t('home.feature4Title'), desc: t('home.feature4Desc'), grad: 'g-olive' },
  ];

  return (
    <PageTransition>
      {/* Hero — image centered at one third of the page width, text below */}
      <section className="px-4 pt-10 pb-4 text-center">
        <div className="flex justify-center">
          <motion.img
            src={HERO_IMAGE}
            alt="PalBook"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full max-w-sm h-auto drop-shadow-2xl"
            loading="eager"
          />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-5 text-3xl md:text-5xl font-display font-extrabold leading-tight text-slate-800 dark:text-white"
        >
          {t('home.welcome')}
        </motion.h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          {t('home.subtitle')}
        </p>
      </section>

      {/* Explore sections — centered cards */}
      <section className="px-4 py-12">
        <h2 className="text-center text-xl md:text-2xl font-display font-extrabold text-secondary-800 dark:text-secondary-300 mb-7">
          🧭 {t('home.exploreSections')}
        </h2>
        <div className="flex flex-wrap justify-center gap-5">
          {sections.map((s, i) => (
            <motion.button
              key={s.to}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(s.to)}
              className={`${s.grad} relative overflow-hidden w-[300px] max-w-full rounded-[26px] p-6 text-start shadow-kid group`}
            >
              <span className="absolute -top-8 -end-8 w-28 h-28 bg-white/25 rounded-full" />
              <span className="relative block text-5xl mb-2.5 group-hover:scale-110 transition-transform">
                {s.emoji}
              </span>
              <h3 className="relative text-xl font-extrabold mb-1">{s.title}</h3>
              <p className="relative text-sm opacity-90 mb-3.5">{s.desc}</p>
              <span className="relative inline-flex items-center gap-1.5 text-sm font-extrabold">
                {t('common.explore')} <FiArrowLeft className="rtl-flip" />
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Why PalBook — centered cards */}
      <section className="px-4 pb-16">
        <h2 className="text-center text-xl md:text-2xl font-display font-extrabold text-secondary-800 dark:text-secondary-300 mb-7">
          ✨ {t('home.whyTitle')}
        </h2>
        <div className="flex flex-wrap justify-center gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="w-[240px] max-w-full rounded-3xl p-6 text-center bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-soft hover:shadow-kid transition-shadow"
            >
              <div
                className={`${f.grad} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-kid`}
              >
                <span className="text-3xl">{f.emoji}</span>
              </div>
              <h3 className="text-lg font-bold mb-1.5 text-slate-800 dark:text-white">{f.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
};

export default HomePage;
