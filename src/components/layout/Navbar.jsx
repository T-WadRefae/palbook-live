import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../common/LanguageSwitcher';
import ThemeToggle from '../common/ThemeToggle';

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-white/50 dark:border-slate-800">
      {/* direction:ltr keeps language physically on the left and theme on the right in both languages */}
      <nav
        style={{ direction: 'ltr' }}
        className="max-w-7xl mx-auto px-4 py-2.5 grid grid-cols-[1fr_auto_1fr] items-center gap-3"
      >
        {/* Left: language switch */}
        <div className="justify-self-start">
          <LanguageSwitcher />
        </div>

        {/* Center: logo + Home */}
        <Link to="/" className="justify-self-center flex items-center gap-2.5">
          <img
            src="/logo.png"
            alt="PalBook Live"
            className="w-10 h-10 object-contain drop-shadow"
          />
          <span className="font-display font-bold text-base sm:text-lg text-slate-700 dark:text-slate-100 whitespace-nowrap">
            {t('nav.home')}
          </span>
        </Link>

        {/* Right: theme (day/night) */}
        <div className="justify-self-end">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
