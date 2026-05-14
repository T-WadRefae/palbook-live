import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiArrowLeft } from 'react-icons/fi';
import Confetti from 'react-confetti';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useAuth } from '../../contexts/AuthContext';
import { addPoints } from '../../firebase/lessons';

export const GameShell = ({ title, emoji, score, total, children, showConfetti }) => {
  const { t } = useTranslation();
  const { width, height } = useWindowSize();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={250}
          recycle={false}
          colors={['#CE1126', '#007A3D', '#FFFFFF', '#000000', '#facc15']}
        />
      )}

      <div className="flex items-center justify-between mb-6">
        <Link to="/games" className="btn-outline !py-2 !px-4 !text-sm">
          <FiArrowLeft className="rtl-flip" /> {t('common.back')}
        </Link>
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-accent-400 to-accent-500 text-slate-900 font-bold shadow-glow">
          <span className="text-xl">⭐</span>
          <span>
            {t('games.score')}: {score}
            {total ? ` / ${total}` : ''}
          </span>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
        <div className="text-6xl mb-2 inline-block animate-wiggle">{emoji}</div>
        <h1 className="text-3xl font-display font-extrabold gradient-text">{title}</h1>
        <p className="text-xs text-slate-500 mt-1">by T. Wad Refae 🇵🇸</p>
      </motion.div>

      {children}
    </div>
  );
};

/**
 * Save points to user when game ends
 */
export const useSavePoints = () => {
  const { user, refreshProfile } = useAuth();
  return async (points) => {
    if (!user || points <= 0) return;
    try {
      await addPoints(user.uid, points);
      await refreshProfile();
    } catch (err) {
      console.error('Failed to save points:', err);
    }
  };
};
