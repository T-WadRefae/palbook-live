import { useTranslation } from 'react-i18next';
import Logo from '../common/Logo';
import VisitCounter from '../common/VisitCounter';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="mt-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300">
      {/* Palestinian flag stripe */}
      <div className="h-1 flex">
        <div className="flex-1 bg-palestine-red" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-palestine-green" />
        <div className="flex-1 bg-palestine-black" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <Logo size="md" linkTo={null} showTagline={false} />
            <p className="text-sm mt-4 text-slate-400 leading-relaxed">
              {t('footer.crafted')}
            </p>
            <p className="text-sm mt-2 text-slate-400 leading-relaxed">
              {t('footer.craftedBy')}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3">{t('nav.home')}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/general" className="hover:text-accent-400 transition-colors">{t('nav.general')}</a></li>
              <li><a href="/palbook" className="hover:text-accent-400 transition-colors">{t('nav.palbook')}</a></li>
              <li><a href="/games" className="hover:text-accent-400 transition-colors">{t('nav.games')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3">🇵🇸 {t('footer.palestineTitle')}</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t('footer.palestineDesc')}
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-700 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p className="flex flex-wrap items-center justify-center gap-x-1 text-center md:text-start">
            <span>Made with 🩷 in Palestine · © 2026 T. Wad Refae ·</span>
            <a
              href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
              target="_blank"
              rel="license noopener noreferrer"
              title="Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International"
              className="underline underline-offset-2 hover:text-accent-400 transition-colors"
            >
              CC BY-NC-ND 4.0
            </a>
          </p>
          <VisitCounter />
        </div>
      </div>
    </footer>
  );
};

export default Footer;