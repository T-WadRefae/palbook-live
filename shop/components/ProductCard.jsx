import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { PRODUCT_TYPE_META, formatPrice, localized } from '../constants';

const ProductCard = ({ product, index = 0, owned = false, onOpen }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const title = localized(product, 'title', lang);
  const description = localized(product, 'description', lang);
  const typeMeta = PRODUCT_TYPE_META[product.type] || PRODUCT_TYPE_META.pdf;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      onClick={() => onOpen?.(product)}
      className="g-mix group cursor-pointer relative flex flex-col overflow-hidden rounded-3xl shadow-soft p-6 transition-all duration-300 hover:shadow-kid"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/30 to-transparent rounded-bl-full opacity-60" />

      {owned && (
        <div className="absolute top-3 end-3 bg-emerald-500 text-white px-2.5 py-1 rounded-lg flex items-center gap-1 text-xs font-bold shadow-sm">
          <FiCheckCircle size={12} /> {t('shop.owned')}
        </div>
      )}

      <div className="relative w-20 h-20 rounded-2xl bg-white/85 dark:bg-slate-900/40 flex items-center justify-center text-5xl mb-4 shadow-kid group-hover:scale-110 transition-transform duration-300">
        {product.emoji || typeMeta.emoji}
      </div>

      <span className="badge bg-white/70 dark:bg-black/25 text-slate-700 dark:text-slate-100 self-start mb-2">
        {typeMeta.emoji} {t(typeMeta.labelKey)}
      </span>

      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">{title}</h3>

      {description && (
        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-4">
          {description}
        </p>
      )}

      {Array.isArray(product.grades) && product.grades.length > 0 && (
        <div className="flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400 mb-4">
          {product.grades.map((g) => (
            <span key={g} className="px-2 py-1 bg-white/50 dark:bg-black/20 rounded-lg">
              {t('palbook.grade')} {g}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between gap-2 mt-auto pt-3 border-t border-black/10 dark:border-white/15">
        <span className="text-2xl font-extrabold text-slate-800 dark:text-white">
          {formatPrice(product.price, lang)}
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm font-extrabold text-primary-700 dark:text-primary-300">
          {owned ? t('shop.openNow') : t('shop.details')} <FiArrowLeft className="rtl-flip" />
        </span>
      </div>
    </motion.div>
  );
};

export default ProductCard;
