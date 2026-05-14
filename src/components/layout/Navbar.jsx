import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiMenu, FiX, FiUser, FiLogOut, FiGrid } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Logo from '../common/Logo';
import LanguageSwitcher from '../common/LanguageSwitcher';
import ThemeToggle from '../common/ThemeToggle';
import { useAuth } from '../../contexts/AuthContext';
import { logoutUser } from '../../firebase/auth';

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, profile, isAuthenticated, isTeacher } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success(t('auth.logoutSuccess'));
      navigate('/');
      setMenuOpen(false);
      setMobileOpen(false);
    } catch (err) {
      toast.error(t('common.error'));
    }
  };

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/general', label: t('nav.general') },
    { to: '/palbook', label: t('nav.palbook') },
    { to: '/games', label: t('nav.games') },
  ];

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-2xl font-semibold text-sm transition-all duration-200 ${
      isActive
        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-kid'
        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Logo size="md" showTagline />

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === '/'}>
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((m) => !m)}
                className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-gradient-pal text-white font-bold shadow-soft hover:shadow-kid transition-shadow"
              >
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm">
                  {profile?.displayName?.[0] || user?.email?.[0] || 'U'}
                </div>
                <span className="text-sm max-w-[100px] truncate">
                  {profile?.displayName || user?.email?.split('@')[0]}
                </span>
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
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {profile?.role === 'teacher' ? '👩‍🏫 Teacher' : '🎓 Student'}
                      </p>
                      <p className="font-bold text-sm truncate">{profile?.displayName}</p>
                    </div>
                    <Link
                      to={isTeacher ? '/teacher' : '/student'}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium"
                    >
                      <FiGrid /> {t('nav.dashboard')}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 text-sm font-medium w-full text-start"
                    >
                      <FiLogOut /> {t('nav.logout')}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-outline !py-2 !text-sm">
                {t('nav.login')}
              </Link>
              <Link to="/register" className="btn-primary !py-2 !text-sm">
                {t('nav.register')}
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
          aria-label="Menu"
        >
          {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-slate-200 dark:border-slate-800"
          >
            <div className="p-4 flex flex-col gap-2 bg-white dark:bg-slate-900">
              {navLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={linkClass}
                >
                  {l.label}
                </NavLink>
              ))}
              <div className="flex items-center gap-2 mt-2 pt-3 border-t border-slate-200 dark:border-slate-700">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
              {isAuthenticated ? (
                <>
                  <Link
                    to={isTeacher ? '/teacher' : '/student'}
                    onClick={() => setMobileOpen(false)}
                    className="btn-secondary !justify-start"
                  >
                    <FiGrid /> {t('nav.dashboard')}
                  </Link>
                  <button onClick={handleLogout} className="btn-outline !justify-start">
                    <FiLogOut /> {t('nav.logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="btn-outline"
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary"
                  >
                    {t('nav.register')}
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
