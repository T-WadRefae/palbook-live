import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiX, FiMaximize2, FiMinimize2, FiExternalLink } from 'react-icons/fi';

const LessonViewer = ({ lesson, onClose }) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [fullscreen, setFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!lesson) return null;
  const title = isAr && lesson.titleAr ? lesson.titleAr : lesson.title;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 md:p-6"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`bg-white dark:bg-slate-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden ${
          fullscreen ? 'w-full h-full' : 'w-full max-w-6xl h-[90vh]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-pal text-white">
          <div className="flex items-center gap-3 min-w-0">
            <div className="text-3xl shrink-0">{lesson.thumbnail || '📚'}</div>
            <div className="min-w-0">
              <h3 className="font-bold text-lg truncate">{title}</h3>
              <p className="text-xs opacity-80 truncate">T. Wad Refae • {lesson.section}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={lesson.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              aria-label="Open in new tab"
            >
              <FiExternalLink />
            </a>
            <button
              onClick={() => setFullscreen((f) => !f)}
              className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              aria-label="Toggle fullscreen"
            >
              {fullscreen ? <FiMinimize2 /> : <FiMaximize2 />}
            </button>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
              aria-label={t('common.close')}
            >
              <FiX />
            </button>
          </div>
        </div>

        {/* Iframe */}
        <div className="flex-1 relative bg-slate-50 dark:bg-slate-800">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <iframe
            src={lesson.fileUrl}
            title={title}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            className="w-full h-full border-0"
            onLoad={() => setLoading(false)}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LessonViewer;
