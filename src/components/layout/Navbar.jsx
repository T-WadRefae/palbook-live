import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiUser } from 'react-icons/fi';
import LanguageSwitcher from '../common/LanguageSwitcher';
import ThemeToggle from '../common/ThemeToggle';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { t } = useTranslation();
  const { isAuthenticated, isTeacher } = useAuth();

  // Signed out → login; teacher → dashboard; buyer → their library.
  const accountTo = !isAuthenticated ? '/login' : isTeacher ? '/teacher' : '/library';
  const accountLabel = !isAuthenticated
    ? t('nav.login')
    : isTeacher
      ? t('nav.dashboard')
      : t('shop.libraryTitle');

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-white/50 dark:border-slate-800">
      {/* direction:ltr keeps language physically on the left and theme on the right in both languages */}
      <nav
        style={{ direction: 'ltr' }}
        className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3"
      >
        {/* Left: language switch + shop */}
        <div className="justify-self-start flex items-center gap-2">
          <LanguageSwitcher />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/shop"
              className="flex items-center gap-2 h-10 px-3 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm shadow-soft hover:border-primary-400 transition-colors"
              aria-label={t('shop.title')}
            >
              <FiShoppingBag className="text-primary-500 shrink-0" />
              <span className="hidden md:inline whitespace-nowrap">{t('shop.title')}</span>
            </Link>
          </motion.div>
        </div>

        {/* Center: logo + Home */}
        <Link to="/" className="justify-self-center flex items-center gap-2.5">
          <img
            src="/logo.png"
            alt="PalBook"
            className="w-10 h-10 object-contain drop-shadow"
          />
          <span className="font-display font-bold text-base sm:text-lg text-slate-700 dark:text-slate-100 whitespace-nowrap">
            {t('nav.home')}
          </span>
        </Link>

        {/* Right: account + theme (day/night) */}
        <div className="justify-self-end flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={accountTo}
              className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-soft hover:border-primary-400 transition-colors"
              aria-label={accountLabel}
              title={accountLabel}
            >
              <FiUser className="text-primary-500 text-lg" />
            </Link>
          </motion.div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
