import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiHome, FiUpload, FiBookOpen, FiUsers, FiBarChart2 } from 'react-icons/fi';

const Sidebar = ({ open = true, onClose }) => {
  const { t } = useTranslation();

  const links = [
    { to: '/teacher', icon: <FiHome />, label: t('dashboard.teacherDashboard'), end: true },
    { to: '/teacher/upload', icon: <FiUpload />, label: t('dashboard.uploadLesson') },
    { to: '/teacher/lessons', icon: <FiBookOpen />, label: t('dashboard.myLessons') },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 ${
      isActive
        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-kid'
        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
    }`;

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <motion.aside
        initial={false}
        className={`fixed lg:static top-0 start-0 z-40 h-full lg:h-auto w-72 bg-white dark:bg-slate-900 border-e border-slate-200 dark:border-slate-800 p-4 transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } [dir=rtl]:translate-x-0 [dir=rtl]:[transform:translateX(0)]`}
      >
        <div className="mb-6 p-4 rounded-2xl bg-gradient-pal text-white">
          <p className="text-xs opacity-80">👩‍🏫 Teacher Panel</p>
          <p className="font-bold text-lg">T. Wad Refae</p>
          
        </div>

        <nav className="flex flex-col gap-1">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass} onClick={onClose}>
              <span className="text-lg">{l.icon}</span>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-accent-100 to-accent-200 dark:from-accent-900/30 dark:to-accent-800/30 border border-accent-300/50">
          <div className="text-2xl mb-1">🎯</div>
          <p className="text-xs font-bold text-accent-800 dark:text-accent-300">
            Tip: Upload self-contained HTML files for the best experience.
          </p>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
