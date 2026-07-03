import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiPlayCircle, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';

const LessonCard = ({
  lesson,
  onOpen,
  onEdit,
  onDelete,
  showActions = false,
  index = 0,
}) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const title = isAr && lesson.titleAr ? lesson.titleAr : lesson.title;
  const views = lesson.views || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="g-mix group cursor-pointer relative overflow-hidden rounded-3xl shadow-soft p-6 transition-all duration-300 hover:shadow-kid"
      onClick={() => onOpen?.(lesson)}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/30 to-transparent rounded-bl-full opacity-60" />

      {/* Views badge */}
      {views > 0 && (
        <div className="absolute top-3 end-3 bg-white/90 dark:bg-slate-700/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-sm">
          <FiEye size={12} /> {views}
        </div>
      )}

      <div className="relative">
        <div className="w-20 h-20 rounded-2xl bg-white/85 dark:bg-slate-900/40 flex items-center justify-center text-5xl mb-4 shadow-kid group-hover:scale-110 transition-transform duration-300">
          {lesson.thumbnail || '📚'}
        </div>

        {lesson.section === 'palbook' && (
          <span className="badge bg-secondary-100 text-secondary-700 mb-2">
            🇵🇸 PalBook Live
          </span>
        )}

        {lesson.section === 'general' && (
          <span className="badge bg-primary-100 text-primary-700 mb-2">
            ✨ General
          </span>
        )}

        {lesson.discovered && (
          <span className="badge bg-sky-100 text-sky-700 mb-2 ms-1.5">
            🆕 {t('dashboard.unregistered')}
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-2 mb-1">
        {title}
      </h3>

      {lesson.description && (
        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-4">
          {lesson.description}
        </p>
      )}

      <div className="flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400 mb-4">
        {lesson.grade && (
          <span className="px-2 py-1 bg-white/50 dark:bg-black/20 rounded-lg">
            {t('palbook.grade')} {lesson.grade}
          </span>
        )}
        {/* General lessons can serve several grades at once */}
        {Array.isArray(lesson.grades) &&
          lesson.grades.map((g) => (
            <span
              key={g}
              className="px-2 py-1 bg-white/50 dark:bg-black/20 rounded-lg"
            >
              {t('palbook.grade')} {g}
            </span>
          ))}
        {lesson.unit && (
          <span className="px-2 py-1 bg-white/50 dark:bg-black/20 rounded-lg">
            {t('palbook.unit')} {lesson.unit}
          </span>
        )}
        {lesson.lesson && (
          <span className="px-2 py-1 bg-white/50 dark:bg-black/20 rounded-lg">
            {t('palbook.lesson')} {lesson.lesson}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 mt-auto pt-3 border-t border-black/10 dark:border-white/15">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpen?.(lesson);
          }}
          className="flex-1 btn-primary !py-2 !text-sm"
        >
          <FiPlayCircle /> {t('general.openLesson')}
        </button>

        {showActions && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(lesson);
              }}
              className="w-10 h-10 rounded-xl bg-accent-100 hover:bg-accent-200 text-accent-700 flex items-center justify-center transition-colors"
              aria-label="Edit"
            >
              <FiEdit2 />
            </button>
            {!lesson.discovered && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(lesson);
                }}
                className="w-10 h-10 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors"
                aria-label="Delete"
              >
                <FiTrash2 />
              </button>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default LessonCard;