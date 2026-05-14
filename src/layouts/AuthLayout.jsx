import { Outlet, Link } from 'react-router-dom';
import Logo from '../components/common/Logo';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import ThemeToggle from '../components/common/ThemeToggle';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pal-pattern">
      <header className="px-6 py-4 flex items-center justify-between max-w-7xl w-full mx-auto">
        <Link to="/">
          <Logo size="md" linkTo={null} showTagline />
        </Link>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Outlet />
      </main>

      <footer className="text-center py-4 text-xs text-slate-500 dark:text-slate-400">
        © 2026 PalBook Live • T. Wad Refae 🇵🇸
      </footer>
    </div>
  );
};

export default AuthLayout;
