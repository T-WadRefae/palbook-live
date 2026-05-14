import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Loader = ({ fullScreen = false, message }) => {
  const { t } = useTranslation();

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative w-20 h-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-500 border-r-accent-500"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 rounded-full border-4 border-transparent border-b-secondary-500 border-l-primary-300"
        />
        <div className="absolute inset-0 flex items-center justify-center text-3xl">📚</div>
      </div>
      <p className="text-slate-600 dark:text-slate-300 font-semibold animate-pulse">
        {message || t('common.loading')}
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-white/90 dark:bg-slate-900/95 backdrop-blur-sm flex items-center justify-center">
        {content}
      </div>
    );
  }

  return <div className="py-12 flex items-center justify-center">{content}</div>;
};

export default Loader;
