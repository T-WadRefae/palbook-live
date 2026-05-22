import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiLogOut, FiGrid } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Logo from '../common/Logo';
import LanguageSwitcher from '../common/LanguageSwitcher';
import ThemeToggle from '../common/ThemeToggle';
import { useAuth } from '../../contexts/AuthContext';
import { logoutUser } from '../../firebase/auth';

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, isTeacher, profile } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success('Logged out');
      navigate('/');
      setMenuOpen(false);
    } catch (err) {
      toast.error('Error');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Logo - left */}
        <Logo size="md" showTagline />

        {/* Right actions - always visible */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />

          {/* Teacher menu (only if logged in as teacher) */}
          {isAuthenticated && isTeacher && (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((m) => !m)}
                className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-gradient-pal text-white font-bold shadow-soft hover:shadow-kid transition-shadow"
              >
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm">
                  {profile?.displayName?.[0] || 'T'}
                </div>
                <span className="text-sm hidden sm:inline">Teacher</span>
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute end-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                  >
                    <div className="p-3 border-b border-slate-100 dark:border-slate-700">
                      <p className="font-bold text-sm truncate">
                        {profile?.displayName || 'Teacher'}
                      </p>
                    </div>
                    <Link
                      to="/teacher"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium"
                    >
                      <FiGrid /> Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 text-sm font-medium w-full text-start"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;