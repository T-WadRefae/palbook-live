import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiUpload, FiBookOpen, FiUsers, FiBarChart2, FiPlus } from 'react-icons/fi';
import PageTransition from '../../components/common/PageTransition';
import Loader from '../../components/common/Loader';
import { useAuth } from '../../contexts/AuthContext';
import { getLessons } from '../../firebase/lessons';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';

const TeacherDashboard = () => {
  const { t } = useTranslation();
  const { profile } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [studentsCount, setStudentsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [lessonsData, studentsSnap] = await Promise.all([
          getLessons({}),
          getDocs(query(collection(db, 'users'), where('role', '==', 'student'))),
        ]);
        setLessons(lessonsData);
        setStudentsCount(studentsSnap.size);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loader />;

  const palbookCount = lessons.filter((l) => l.section === 'palbook').length;
  const generalCount = lessons.filter((l) => l.section === 'general').length;

  const stats = [
    {
      icon: <FiBookOpen />,
      label: 'Total Lessons',
      value: lessons.length,
      gradient: 'from-primary-400 to-pink-500',
    },
    {
      icon: <FiUsers />,
      label: 'Students',
      value: studentsCount,
      gradient: 'from-secondary-400 to-emerald-500',
    },
    {
      icon: <FiBarChart2 />,
      label: 'PalBook Lessons',
      value: palbookCount,
      gradient: 'from-accent-400 to-orange-500',
    },
    {
      icon: <FiBarChart2 />,
      label: 'General Lessons',
      value: generalCount,
      gradient: 'from-violet-400 to-purple-500',
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
          <p className="text-white/90 mt-2 text-sm">🇵🇸 PalBook Live</p>

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
      {lessons.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">📚 Recent Lessons</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lessons.slice(0, 6).map((l) => (
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
