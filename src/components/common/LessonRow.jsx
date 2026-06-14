import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiPlayCircle, FiEye, FiChevronLeft } from 'react-icons/fi';

const LessonRow = ({ lesson, onOpen, index = 0 }) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const title = isAr && lesson.titleAr ? lesson.titleAr : lesson.title;
  const views = lesson.views || 0;
  const lessonNo = lesson.lesson ?? index + 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ x: isAr ? -4 : 4 }}
      onClick={() => onOpen?.(lesson)}
      className="group cursor-pointer flex items-center gap-3 sm:gap-4 g-mix rounded-2xl shadow-soft hover:shadow-kid border border-black/10 dark:border-white/10 px-3 py-3 sm:px-4 transition-all duration-200"
    >
      {/* Lesson number / thumbnail */}
      <div className="shrink-0 relative">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/85 dark:bg-slate-900/40 text-secondary-700 dark:text-secondary-200 flex items-center justify-center text-xl sm:text-2xl shadow-kid group-hover:scale-105 transition-transform duration-200">
          {lesson.thumbnail || lessonNo}
        </div>
        <span className="absolute -bottom-1.5 -end-1.5 min-w-[20px] h-5 px-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[10px] font-extrabold text-secondary-700 dark:text-secondary-300 flex items-center justify-center shadow-sm">
          {lessonNo}
        </span>
      </div>

      {/* Main info */}
      <div className="min-w-0 flex-1">
        <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white truncate">
          {title}
        </h3>

        {lesson.description && (
          <p className="hidden sm:block text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
            {lesson.description}
          </p>
        )}

        {/* Boxed lesson info */}
        <div className="flex flex-wrap items-center gap-1.5 mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">
          {lesson.grade && (
            <span className="px-2 py-0.5 bg-white/50 dark:bg-black/20 rounded-md font-semibold">
              {t('palbook.grade')} {lesson.grade}
            </span>
          )}
          {lesson.unit && (
            <span className="px-2 py-0.5 bg-white/50 dark:bg-black/20 rounded-md font-semibold">
              {t('palbook.unit')} {lesson.unit}
            </span>
          )}
          {lesson.lesson && (
            <span className="px-2 py-0.5 bg-white/60 dark:bg-black/25 text-secondary-800 dark:text-secondary-200 rounded-md font-semibold">
              {t('palbook.lesson')} {lesson.lesson}
            </span>
          )}
          {views > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/50 dark:bg-black/20 rounded-md font-semibold">
              <FiEye size={11} /> {views}
            </span>
          )}
        </div>
      </div>

      {/* Action */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onOpen?.(lesson);
        }}
        className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-sm shadow-soft group-hover:shadow-kid transition-all
          w-10 h-10 sm:w-auto sm:h-auto sm:px-4 sm:py-2"
        aria-label={t('general.openLesson')}
      >
        <FiPlayCircle className="sm:hidden" size={20} />
        <span className="hidden sm:inline">{t('general.openLesson')}</span>
        <FiChevronLeft className="hidden sm:inline rtl-flip" size={16} />
      </button>
    </motion.div>
  );
};

export default LessonRow;
