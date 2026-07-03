import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiUpload, FiBookOpen, FiPlus, FiEye, FiFlag, FiLayers } from 'react-icons/fi';
import PageTransition from '../../components/common/PageTransition';
import Loader from '../../components/common/Loader';
import { useAuth } from '../../contexts/AuthContext';
import { getMergedLessons } from '../../firebase/lessons';

const TeacherDashboard = () => {
  const { t } = useTranslation();
  const { profile } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  (async () => {
    try {
      const lessonsData = await getMergedLessons({}, { force: true });
      setLessons(lessonsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  })();
}, []);


  if (loading) return <Loader />;

  // Registered = in Firestore; unregistered arrived via git push and are only
  // discovered in the GitHub repo until the teacher registers them.
  const registered = lessons.filter((l) => !l.discovered);
  const unregistered = lessons.filter((l) => l.discovered);
  const palbookCount = registered.filter((l) => l.section === 'palbook').length;
  const generalCount = registered.filter((l) => l.section === 'general').length;
  const totalViews = registered.reduce((sum, l) => sum + (l.views || 0), 0);

  const stats = [
  {
    icon: <FiBookOpen />,
    label: 'Total Lessons',
    value: registered.length,
    gradient: 'from-sky-400 to-sky-600',
  },
  {
    icon: <FiEye />,
    label: 'Total Views',
    value: totalViews,
    gradient: 'from-secondary-400 to-secondary-600',
  },
  {
    icon: <FiFlag />,
    label: 'PalBook Live',
    value: palbookCount,
    gradient: 'from-sky-500 to-sky-700',
  },
  {
    icon: <FiLayers />,
    label: 'General',
    value: generalCount,
    gradient: 'from-secondary-500 to-secondary-700',
  },
];

  return (
    <PageTransition>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-pal text-white p-6 md:p-8 mb-8 shadow-kid"
      >
        <div className="absolute -top-10 -end-10 w-40 h-40 bg-white/10 rounded-full" />
        <div className="relative">
          <p className="text-white/80 text-sm">👩‍🏫 {t('dashboard.teacherDashboard')}</p>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-1">
            {profile?.displayName || 'T. Wad Refae'}
          </h1>
          <p className="text-white/90 mt-2 text-sm">🇵🇸 PalBook</p>

          <div className="flex flex-wrap gap-2 mt-4">
            <Link to="/teacher/upload" className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white text-primary-600 font-bold text-sm hover:scale-105 transition-transform">
              <FiPlus /> {t('dashboard.uploadLesson')}
            </Link>
            <Link to="/teacher/lessons" className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/20 backdrop-blur text-white font-bold text-sm hover:bg-white/30 transition-colors">
              <FiBookOpen /> {t('dashboard.myLessons')}
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Lessons that arrived via git push and are waiting for registration */}
      {unregistered.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="g-blue rounded-3xl p-5 mb-8 shadow-kid flex flex-wrap items-center justify-between gap-3"
        >
          <div>
            <p className="font-extrabold">
              🆕 {unregistered.length} {t('dashboard.newFromGithub')}
            </p>
            <p className="text-sm opacity-80 mt-0.5">{t('dashboard.newFromGithubHint')}</p>
          </div>
          <Link to="/teacher/lessons?filter=new" className="btn-secondary !py-2 !text-sm">
            {t('dashboard.reviewRegister')}
          </Link>
        </motion.div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card !p-5"
          >
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.gradient} text-white flex items-center justify-center mb-3 shadow-soft`}>
              <span className="text-xl">{s.icon}</span>
            </div>
            <div className="text-3xl font-extrabold gradient-text">{s.value}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link to="/teacher/upload" className="card hover:shadow-kid group">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary-500 to-pink-600 text-white flex items-center justify-center mb-4 shadow-kid group-hover:scale-110 transition-transform">
            <FiUpload size={28} />
          </div>
          <h3 className="text-xl font-bold mb-2">{t('dashboard.uploadLesson')}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Upload new HTML lessons to PalBook Live or the General section.
          </p>
        </Link>

        <Link to="/teacher/lessons" className="card hover:shadow-kid group">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-secondary-500 to-emerald-600 text-white flex items-center justify-center mb-4 shadow-soft group-hover:scale-110 transition-transform">
            <FiBookOpen size={28} />
          </div>
          <h3 className="text-xl font-bold mb-2">{t('dashboard.myLessons')}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            View, edit, or delete all your uploaded lessons in one place.
          </p>
        </Link>
      </div>

      {/* Recent lessons preview */}
      {registered.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">📚 Recent Lessons</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {registered.slice(0, 6).map((l) => (
              <div key={l.id} className="card !p-4 flex items-center gap-3">
                <div className="text-3xl">{l.thumbnail || '📚'}</div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-sm truncate">{l.title}</p>
                  <p className="text-xs text-slate-500 truncate">
                    {l.section} {l.grade ? `• Grade ${l.grade}` : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageTransition>
  );
};

export default TeacherDashboard;
