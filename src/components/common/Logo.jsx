import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Logo = ({ size = 'md', linkTo = '/', showTagline = false }) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl',
  };

  const dotSize = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const content = (
    <div className="flex items-center gap-3">
      <motion.div
        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className={`${dotSize[size]} rounded-2xl bg-gradient-pal flex items-center justify-center shadow-kid relative overflow-hidden`}
      >
        <span className="text-white font-bold text-xl drop-shadow">P</span>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-accent-400 animate-pulse" />
      </motion.div>
      <div className="leading-tight">
        <div className={`font-display font-extrabold ${sizeClasses[size]} gradient-text`}>
          PalBook<span className="text-secondary-500">Live</span>
        </div>
        {showTagline && (
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
            by T. Wad Refae 🇵🇸
          </div>
        )}
      </div>
    </div>
  );

  return linkTo ? <Link to={linkTo}>{content}</Link> : content;
};

export default Logo;
