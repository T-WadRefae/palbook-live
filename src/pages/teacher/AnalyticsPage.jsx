import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEye, FiBookOpen, FiTrendingUp, FiAward, FiBarChart2, FiExternalLink } from 'react-icons/fi';
import PageTransition from '../../components/common/PageTransition';
import Loader from '../../components/common/Loader';
import { getLessons } from '../../firebase/lessons';

const AnalyticsPage = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getLessons({});
        setLessons(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loader />;

  // Calculate stats
  const totalViews = lessons.reduce((sum, l) => sum + (l.views || 0), 0);
  const totalLessons = lessons.length;
  const avgViews = totalLessons > 0 ? Math.round(totalViews / totalLessons) : 0;

  const sortedByViews = [...lessons].sort((a, b) => (b.views || 0) - (a.views || 0));
  const topLessons = sortedByViews.slice(0, 10);
  const maxViews = topLessons[0]?.views || 1;

  const palbookViews = lessons.filter(l => l.section === 'palbook').reduce((s, l) => s + (l.views || 0), 0);
  const generalViews = lessons.filter(l => l.section === 'general').reduce((s, l) => s + (l.views || 0), 0);

  const viewsByGrade = {};
  lessons.forEach(l => {
    if (l.grade) {
      viewsByGrade[l.grade] = (viewsByGrade[l.grade] || 0) + (l.views || 0);
    }
  });

  const stats = [
    {
      icon: <FiEye />,
      label: 'Total Views',
      value: totalViews,
      gradient: 'from-primary-400 to-pink-500',
    },
    {
      icon: <FiBookOpen />,
      label: 'Total Lessons',
      value: totalLessons,
      gradient: 'from-secondary-400 to-emerald-500',
    },
    {
      icon: <FiTrendingUp />,
      label: 'Avg Views',
      value: avgViews,
      gradient: 'from-accent-400 to-orange-500',
    },
    {
      icon: <FiAward />,
      label: 'Top Lesson Views',
      value: maxViews,
      gradient: 'from-violet-400 to-purple-500',
    },
  ];

  return (
    <PageTransition>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-pink-600 text-white flex items-center justify-center shadow-kid">
            <FiBarChart2 size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-display font-extrabold gradient-text">
              Analytics
            </h1>
            <p className="text-sm text-slate-500">Track lesson views and engagement</p>
          </div>
        </div>
      </motion.div>

      {/* Vercel Analytics link */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card !p-4 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-bold text-slate-800">📊 Site Visits & Traffic</p>
            <p className="text-xs text-slate-600">
              For visitor count, locations, and devices, check Vercel Analytics
            </p>
          </div>
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noreferrer"
            className="btn-outline !py-2 !text-sm shrink-0"
          >
            Open <FiExternalLink />
          </a>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Top Lessons */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 card"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            🏆 Top Lessons
          </h2>

          {topLessons.length === 0 || maxViews === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <div className="text-5xl mb-2">📊</div>
              <p>No views yet. Share your site with students!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {topLessons.map((l, i) => {
                const views = l.views || 0;
                const percent = (views / maxViews) * 100;
                return (
                  <div key={l.id} className="group">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <span className="text-sm font-bold text-slate-400 w-6">#{i + 1}</span>
                        <span className="text-xl shrink-0">{l.thumbnail || '📚'}</span>
                        <p className="font-semibold text-sm truncate">{l.title}</p>
                      </div>
                      <span className="text-sm font-bold text-primary-600 ms-2">
                        {views}
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width:'${percent}%'}}
                        transition={{ duration: 0.8, delay: i * 0.05 }}
                        className="h-full bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Breakdowns */}
        <div className="space-y-6">
          {/* By Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <h3 className="text-lg font-bold mb-4">By Section</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>🇵🇸 PalBook Live</span>
                  <span className="font-bold">{palbookViews}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-400 to-primary-500"
                    style={{ width: totalViews > 0 ?' ${(palbookViews / totalViews) * 100}%' : '0%' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>✨ General</span>
                  <span className="font-bold">{generalViews}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-secondary-400 to-secondary-500"
                    style={{ width: totalViews > 0 ? '${(generalViews / totalViews) * 100}% ': '0%' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* By Grade */}
          {Object.keys(viewsByGrade).length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <h3 className="text-lg font-bold mb-4">By Grade</h3>
              <div className="space-y-2">
                {Object.entries(viewsByGrade)
                  .sort(([a], [b]) => Number(a) - Number(b))
                  .map(([grade, views]) => (
                    <div key={grade} className="flex justify-between items-center text-sm py-1">
                      <span className="font-semibold">Grade {grade}</span>
                      <span className="badge bg-accent-100 text-accent-700">{views} views</span>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default AnalyticsPage;