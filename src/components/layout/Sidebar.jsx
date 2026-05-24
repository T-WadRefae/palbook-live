import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiUpload, FiBookOpen, FiBarChart2, FiX, FiLogOut } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { logoutUser } from '../../firebase/auth';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ open = false, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success('Logged out');
      navigate('/');
      onClose?.();
    } catch (err) {
      toast.error('Error');
    }
  };

  // The inner content (shared between desktop and mobile)
  const SidebarContent = () => (
    <>
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

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 w-full text-start"
        >
          <span className="text-lg"><FiLogOut /></span>
          Logout
        </button>
      </nav>

      <div className="mt-4 p-3 rounded-2xl bg-gradient-to-br from-accent-100 to-accent-200 border border-accent-300/50">
        <div className="text-xl mb-1">🎯</div>
        <p className="text-xs font-bold text-accent-800 leading-snug">
          Tip: Upload HTML lessons to GitHub Pages first
        </p>
      </div>
    </>
  );

  return (
    <>
      {/* ===== DESKTOP sidebar (always visible, sticky) ===== */}
      <aside className="hidden lg:block lg:sticky lg:top-16 w-64 h-[calc(100vh-4rem)] bg-white dark:bg-slate-900 border-e border-slate-200 dark:border-slate-800 p-3 overflow-y-auto shrink-0">
        <SidebarContent />
      </aside>

      {/* ===== MOBILE drawer (slides in/out) ===== */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={onClose}
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 end-0 z-50 h-full w-72 max-w-[85vw] bg-white dark:bg-slate-900 p-4 overflow-y-auto lg:hidden shadow-2xl"
            >
              {/* Close button */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <FiX size={20} />
                </button>
                <span className="font-bold text-slate-700 dark:text-slate-200">Menu</span>
              </div>

              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;