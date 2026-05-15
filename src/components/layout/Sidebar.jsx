import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiUpload, FiBookOpen, FiBarChart2, FiX } from 'react-icons/fi';

const Sidebar = ({ open = true, onClose }) => {
  const { t } = useTranslation();

  const links = [
    { to: '/teacher', icon: <FiHome />, label: 'Dashboard', end: true },
    { to: '/teacher/upload', icon: <FiUpload />, label: 'Add Lesson' },
    { to: '/teacher/lessons', icon: <FiBookOpen />, label: 'My Lessons' },
    { to: '/teacher/analytics', icon: <FiBarChart2 />, label: 'Analytics' },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 ${
      isActive
        ? 'bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-kid'
        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
    }`;

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - sticky on desktop, fixed on mobile */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-16 start-0 z-40 h-screen lg:h-[calc(100vh-4rem)] w-64 bg-white dark:bg-slate-900 border-e border-slate-200 dark:border-slate-800 p-3 transition-transform duration-300 ease-in-out overflow-y-auto ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Mobile close button */}
        <div className="flex items-center justify-between mb-3 lg:hidden">
          <span className="font-bold text-slate-700 dark:text-slate-200">Menu</span>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="mb-4 p-3 rounded-2xl bg-gradient-pal text-white">
          <p className="text-xs opacity-80">👩‍🏫 Teacher Panel</p>
          <p className="font-bold">T. Wad Refae</p>
        </div>

        <nav className="flex flex-col gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={linkClass}
              onClick={onClose}
            >
              <span className="text-lg">{l.icon}</span>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-4 p-3 rounded-2xl bg-gradient-to-br from-accent-100 to-accent-200 border border-accent-300/50">
          <div className="text-xl mb-1">🎯</div>
          <p className="text-xs font-bold text-accent-800 leading-snug">
            Tip: Upload HTML lessons to GitHub Pages first
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
