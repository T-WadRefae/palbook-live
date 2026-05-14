import { motion } from 'framer-motion';

const EmptyState = ({ emoji = '📭', title, message, action }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="text-7xl mb-4 animate-float">{emoji}</div>
      <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-2">
        {title}
      </h3>
      {message && (
        <p className="text-slate-500 dark:text-slate-400 max-w-md mb-6">{message}</p>
      )}
      {action}
    </motion.div>
  );
};

export default EmptyState;
