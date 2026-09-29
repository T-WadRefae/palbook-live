import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiX, FiMaximize2, FiMinimize2, FiExternalLink, FiZoomIn, FiZoomOut } from 'react-icons/fi';

const ZOOM_KEY = 'palbook-lesson-zoom';
const ZOOM_MIN = 1;
const ZOOM_MAX = 2.5;
const ZOOM_STEP = 0.25;

const clampZoom = (z) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round(z * 100) / 100));

const LessonViewer = ({ lesson, onClose }) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [fullscreen, setFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Classroom text-size control. Big Android displays (e.g. Vivitek panels)
  // render the mobile-first lessons with small text seen from across the room,
  // and can't always pinch-zoom. Scaling the iframe here enlarges the whole
  // lesson for every lesson at once. The choice is remembered per browser.
  const [zoom, setZoom] = useState(() => {
    try {
      return clampZoom(parseFloat(localStorage.getItem(ZOOM_KEY)) || 1);
    } catch {
      return 1;
    }
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [lesson?.id]);

  useEffect(() => {
    try {
      localStorage.setItem(ZOOM_KEY, String(zoom));
    } catch {
      /* storage is best-effort (private mode / blocked cookies) */
    }
  }, [zoom]);

  if (!lesson) return null;
  const title = isAr && lesson.titleAr ? lesson.titleAr : lesson.title;

  const zoomOut = () => setZoom((z) => clampZoom(z - ZOOM_STEP));
  const zoomIn = () => setZoom((z) => clampZoom(z + ZOOM_STEP));

  // Rendered through a portal on <body>: the page content sits inside a
  // stacking context (<main className="relative z-10">), so a modal rendered
  // in place would be painted *under* the sticky navbar and its toolbar
  // (fullscreen / open / close) would be covered.
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 md:p-6"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`bg-white dark:bg-slate-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden ${
          fullscreen ? 'w-full h-full' : 'w-full max-w-6xl h-[90vh]'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-pal text-white">
          <div className="flex items-center gap-3 min-w-0">
            <div className="text-3xl shrink-0">{lesson.thumbnail || '📚'}</div>
            <div className="min-w-0">
              <h3 className="font-bold text-lg truncate">{title}</h3>
              <p className="text-xs opacity-80 truncate">T. Wad Refae • {lesson.section}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {/* Text-size control for classroom displays */}
            <div className="flex items-center rounded-xl bg-white/20 overflow-hidden">
              <button
                onClick={zoomOut}
                disabled={zoom <= ZOOM_MIN}
                className="w-10 h-10 flex items-center justify-center hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label={t('viewer.smaller', 'Smaller text')}
                title={t('viewer.smaller', 'Smaller text')}
              >
                <FiZoomOut />
              </button>
              <span
                className="min-w-[3rem] text-center text-sm font-bold tabular-nums select-none"
                aria-live="polite"
              >
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={zoomIn}
                disabled={zoom >= ZOOM_MAX}
                className="w-10 h-10 flex items-center justify-center hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label={t('viewer.larger', 'Larger text')}
                title={t('viewer.larger', 'Larger text')}
              >
                <FiZoomIn />
              </button>
            </div>
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

        <div className="flex-1 relative bg-slate-50 dark:bg-slate-800 overflow-auto">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <iframe
            src={lesson.fileUrl}
            title={title}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            className="border-0 block"
            onLoad={() => setLoading(false)}
            style={{
              width: `${100 / zoom}%`,
              height: `${100 / zoom}%`,
              transform: `scale(${zoom})`,
              transformOrigin: isAr ? 'top right' : 'top left',
            }}
          />
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export default LessonViewer;
