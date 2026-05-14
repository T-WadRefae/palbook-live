import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiBookOpen, FiAward, FiTrendingUp, FiPlayCircle, FiZap } from 'react-icons/fi';
import PageTransition from '../../components/common/PageTransition';
import Loader from '../../components/common/Loader';
import { useAuth } from '../../contexts/AuthContext';
import { getLessons } from '../../firebase/lessons';
import { getAchievements, calcProgress } from '../../utils/helpers';

const StudentDashboard = () => {
  const { t } = useTranslation();
  const { profile, user } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const all = await getLessons({});
        setLessons(all);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loader />;

  const points = profile?.points || 0;
  const progress = profile?.progress || {};
  const completedCount = Object.values(progress).filter((p) => p.completed).length;
  const progressPercent = lessons.length
    ? Math.round((completedCount / lessons.length) * 100)
    : 0;
  const achievements = getAchievements(points);
  const unlocked = achievements.filter((a) => a.unlocked);

  // Continue learning - find first incomplete lesson
  const nextLesson = lessons.find((l) => !progress[l.id]?.completed);

  const stats = [
    {
      icon: <FiAward />,
      label: t('dashboard.myPoints'),
      value: points,
      gradient: 'from-accent-400 to-orange-500',
    },
    {
      icon: <FiBookOpen />,
      label: t('dashboard.completedLessons'),
      value: completedCount,
      gradient: 'from-primary-400 to-pink-500',
    },
    {
      icon: <FiTrendingUp />,
      label: t('dashboard.myProgress'),
      value: `${progressPercent}%`,
      gradient: 'from-secondary-400 to-emerald-500',
    },
    {
      icon: <FiZap />,
      label: t('dashboard.achievements'),
      value: unlocked.length,
      gradient: 'from-violet-400 to-purple-500',
    },
  ];

  return (
    <PageTransition>
      {/* Welcome banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-pal text-white p-6 md:p-8 mb-8 shadow-kid"
      >
        <div className="absolute -top-10 -end-10 w-40 h-40 bg-white/10 rounded-full" />
        <div className="absolute -bottom-10 -start-10 w-32 h-32 bg-white/10 rounded-full" />
        <div className="relative">
          <p className="text-white/80 text-sm">{t('dashboard.welcomeBack')} 👋</p>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-1">
            {profile?.displayName || user?.email?.split('@')[0]}
          </h1>
          <p className="text-white/90 mt-2 text-sm">
           🇵🇸 T. Wad Refae
          </p>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card !p-5"
          >
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.gradient} text-white flex items-center justify-center mb-3 shadow-soft`}
            >
              <span className="text-xl">{s.icon}</span>
            </div>
            <div className="text-3xl font-extrabold gradient-text">{s.value}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 card"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FiTrendingUp className="text-primary-500" />
            {t('dashboard.myProgress')}
          </h2>

          {lessons.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400 text-sm py-4">
              {t('dashboard.noProgress')}
            </p>
          ) : (
            <>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    Overall progress
                  </span>
                  <span className="font-bold text-primary-600">{progressPercent}%</span>
                </div>
                <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 rounded-full"
                  />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  {completedCount} / {lessons.length} lessons completed
                </p>
              </div>

              {nextLesson && (
                <Link
                  to="/palbook"
                  className="mt-4 block p-4 rounded-2xl bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-slate-800 dark:to-slate-700 border-2 border-primary-200 dark:border-slate-600 hover:border-primary-400 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-primary-600 font-bold uppercase">
                        {t('dashboard.continueLearning')}
                      </p>
                      <p className="font-bold text-slate-800 dark:text-white mt-1">
                        {nextLesson.thumbnail} {nextLesson.title}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-primary-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FiPlayCircle />
                    </div>
                  </div>
                </Link>
              )}
            </>
          )}
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FiAward className="text-accent-500" />
            {t('dashboard.achievements')}
          </h2>
          <div className="space-y-3">
            {achievements.map((a) => (
              <div
                key={a.id}
                className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${
                  a.unlocked
                    ? 'bg-gradient-to-r from-accent-50 to-orange-50 dark:from-accent-900/30 dark:to-orange-900/30 border border-accent-300'
                    : 'bg-slate-50 dark:bg-slate-800 opacity-50'
                }`}
              >
                <div
                  className={`text-3xl ${a.unlocked ? 'animate-bounce-slow' : 'grayscale'}`}
                >
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-slate-800 dark:text-white">
                    {a.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {a.threshold} pts
                  </p>
                </div>
                {a.unlocked && <span className="text-secondary-500 text-xl">✓</span>}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick links */}
      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        <Link
          to="/palbook"
          className="card !p-6 hover:shadow-kid group flex items-center gap-4"
        >
          <div className="text-4xl group-hover:scale-110 transition-transform">📚</div>
          <div>
            <p className="font-bold text-slate-800 dark:text-white">PalBook Live</p>
            <p className="text-xs text-slate-500">Explore lessons</p>
          </div>
        </Link>
        <Link
          to="/general"
          className="card !p-6 hover:shadow-kid group flex items-center gap-4"
        >
          <div className="text-4xl group-hover:scale-110 transition-transform">📝</div>
          <div>
            <p className="font-bold text-slate-800 dark:text-white">General</p>
            <p className="text-xs text-slate-500">Grammar & pronunciation</p>
          </div>
        </Link>
        <Link
          to="/games"
          className="card !p-6 hover:shadow-kid group flex items-center gap-4"
        >
          <div className="text-4xl group-hover:scale-110 transition-transform">🎮</div>
          <div>
            <p className="font-bold text-slate-800 dark:text-white">Games</p>
            <p className="text-xs text-slate-500">Play and earn points</p>
          </div>
        </Link>
      </div>
    </PageTransition>
  );
};

export default StudentDashboard;
