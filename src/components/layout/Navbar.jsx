import Logo from '../common/Logo';
import LanguageSwitcher from '../common/LanguageSwitcher';
import ThemeToggle from '../common/ThemeToggle';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Logo - left */}
        <Logo size="md" showTagline />

        {/* Language + Theme - right, always visible */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;