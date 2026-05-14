import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiHome, FiLock } from 'react-icons/fi';

const UnauthorizedPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-red-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center mb-6 shadow-kid">
          <FiLock className="text-white text-5xl" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-3">
          {t('errors.unauthorized')}
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mb-8">
          {t('errors.unauthorizedDesc')}
        </p>
        <Link to="/" className="btn-primary">
          <FiHome /> {t('errors.goHome')}
        </Link>
      </motion.div>
    </div>
  );
};

export default UnauthorizedPage;
