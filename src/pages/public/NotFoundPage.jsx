import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiHome } from 'react-icons/fi';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-slate-900 dark:to-slate-800">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <div className="text-9xl font-extrabold gradient-text mb-4 animate-bounce-slow">
          404
        </div>
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-3">
          {t('errors.404Title')}
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mb-8">{t('errors.404Desc')}</p>
        <Link to="/" className="btn-primary">
          <FiHome /> {t('errors.goHome')}
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
