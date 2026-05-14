import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiGlobe } from 'react-icons/fi';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const switchLang = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={switchLang}
      className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm shadow-soft hover:border-primary-400 transition-colors"
      aria-label="Switch language"
    >
      <FiGlobe className="text-primary-500" />
      <span>{i18n.language === 'ar' ? 'EN' : 'عربي'}</span>
    </motion.button>
  );
};

export default LanguageSwitcher;
