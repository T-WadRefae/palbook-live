import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  FiArrowLeft,
  FiCheckCircle,
  FiFileText,
  FiLock,
  FiShoppingCart,
} from 'react-icons/fi';
import PageTransition from '../../components/common/PageTransition';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import { useAuth } from '../../contexts/AuthContext';
import { getProduct, hasEntitlement } from '../../firebase/shop';
import {
  PRODUCT_TYPE_META,
  PRODUCT_TYPES,
  formatFileSize,
  formatPrice,
  localized,
} from '../../utils/shop';

const ProductPage = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user, isTeacher } = useAuth();

  const [product, setProduct] = useState(null);
  const [owned, setOwned] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getProduct(productId);
      setProduct(data);
      if (data && user) setOwned(await hasEntitlement(user.uid, productId));
      setLoading(false);
    })();
  }, [productId, user]);

  if (loading) return <Loader fullScreen />;

  // An unpublished product stays reachable for the teacher previewing it.
  if (!product || (product.published === false && !isTeacher)) {
    return (
      <PageTransition className="max-w-3xl mx-auto px-4 py-16">
        <EmptyState
          emoji="🔍"
          title={t('shop.notFound')}
          message={t('shop.notFoundHint')}
          action={
            <Link to="/shop" className="btn-primary">
              <FiArrowLeft className="rtl-flip" /> {t('shop.backToShop')}
            </Link>
          }
        />
      </PageTransition>
    );
  }

  const title = localized(product, 'title', lang);
  const description = localized(product, 'description', lang);
  const typeMeta = PRODUCT_TYPE_META[product.type] || PRODUCT_TYPE_META.pdf;
  const files = product.files || [];

  const handleBuy = () => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: `/shop/${product.id}/checkout` } } });
      return;
    }
    navigate(`/shop/${product.id}/checkout`);
  };

  return (
    <PageTransition className="max-w-4xl mx-auto px-4 py-10">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:underline mb-6"
      >
        <FiArrowLeft className="rtl-flip" /> {t('shop.backToShop')}
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="card !p-0 overflow-hidden"
      >
        <div className="g-mix p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 shrink-0 rounded-3xl bg-white/85 dark:bg-slate-900/40 flex items-center justify-center text-6xl shadow-kid">
            {product.emoji || typeMeta.emoji}
          </div>
          <div className="flex-1 text-center sm:text-start">
            <span className="badge bg-white/70 dark:bg-black/25 text-slate-700 dark:text-slate-100 mb-2">
              {typeMeta.emoji} {t(typeMeta.labelKey)}
            </span>
            <h1 className="text-3xl font-display font-extrabold text-slate-800 dark:text-white">
              {title}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">by T. Wad Refae</p>
          </div>
          <div className="text-4xl font-extrabold text-slate-800 dark:text-white">
            {formatPrice(product.price, lang)}
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {description && (
            <p className="text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line">
              {description}
            </p>
          )}

          {Array.isArray(product.grades) && product.grades.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.grades.map((g) => (
                <span
                  key={g}
                  className="badge bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-200"
                >
                  {t('palbook.grade')} {g}
                </span>
              ))}
            </div>
          )}

          {/* File names are public; the files themselves stay locked. */}
          {files.length > 0 && (
            <div>
              <h2 className="font-bold text-slate-800 dark:text-white mb-3">
                {t('shop.whatYouGet')}
              </h2>
              <ul className="space-y-2">
                {files.map((f) => (
                  <li
                    key={f.path}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60"
                  >
                    <FiFileText className="text-primary-500 shrink-0" />
                    <span className="flex-1 text-sm font-semibold text-slate-700 dark:text-slate-200 break-all">
                      {f.name}
                    </span>
                    {f.size > 0 && (
                      <span className="text-xs text-slate-400 shrink-0" dir="ltr">
                        {formatFileSize(f.size)}
                      </span>
                    )}
                    {!owned && <FiLock className="text-slate-400 shrink-0" />}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.type === PRODUCT_TYPES.LINK && !owned && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t('shop.linkAfterPurchase')}
            </p>
          )}

          {owned ? (
            <Link to="/library" className="btn-primary w-full">
              <FiCheckCircle /> {t('shop.goToLibrary')}
            </Link>
          ) : (
            <div className="space-y-3">
              <button type="button" onClick={handleBuy} className="btn-primary w-full">
                <FiShoppingCart /> {t('shop.buyNow')}
              </button>
              <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                {t('shop.manualNotice')}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </PageTransition>
  );
};

export default ProductPage;
