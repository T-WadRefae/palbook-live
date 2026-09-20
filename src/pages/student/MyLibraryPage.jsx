import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import {
  FiDownload,
  FiExternalLink,
  FiPlayCircle,
  FiShoppingBag,
} from 'react-icons/fi';
import PageTransition from '../../components/common/PageTransition';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import LessonViewer from '../../components/common/LessonViewer';
import { useAuth } from '../../contexts/AuthContext';
import {
  downloadProductFile,
  getMyEntitlements,
  getMyOrders,
  getProductFileUrl,
  getProducts,
} from '../../firebase/shop';
import {
  ORDER_STATUS,
  ORDER_STATUS_META,
  PRODUCT_TYPES,
  formatDate,
  formatFileSize,
  formatPrice,
  localized,
} from '../../utils/shop';

const MyLibraryPage = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { user, profile } = useAuth();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyFile, setBusyFile] = useState('');
  const [openLesson, setOpenLesson] = useState(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoading(true);
      try {
        const [entitlements, myOrders, catalogue] = await Promise.all([
          getMyEntitlements(user.uid),
          getMyOrders(user.uid),
          // Unpublished products stay in the buyer's library once bought.
          getProducts({ includeUnpublished: true }),
        ]);
        const ownedIds = new Set(entitlements.map((e) => e.productId));
        setProducts(catalogue.filter((p) => ownedIds.has(p.id)));
        setOrders(myOrders);
      } catch (err) {
        console.error(err);
        toast.error(t('common.error'));
      } finally {
        setLoading(false);
      }
    })();
  }, [user, t]);

  const handleDownload = async (file) => {
    setBusyFile(file.path);
    try {
      await downloadProductFile(file);
    } catch (err) {
      console.error(err);
      toast.error(t('shop.downloadFailed'));
    } finally {
      setBusyFile('');
    }
  };

  const handleOpenLesson = async (product) => {
    const file = (product.files || [])[0];
    if (!file) return;
    setBusyFile(file.path);
    try {
      const fileUrl = await getProductFileUrl(file.path);
      setOpenLesson({
        id: product.id,
        title: product.title,
        titleAr: product.titleAr,
        thumbnail: product.emoji || '🖥️',
        section: 'shop',
        fileUrl,
        noTrack: true,
      });
    } catch (err) {
      console.error(err);
      toast.error(t('shop.downloadFailed'));
    } finally {
      setBusyFile('');
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <PageTransition className="max-w-5xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="text-6xl mb-3 animate-float inline-block">📚</div>
        <h1 className="text-3xl md:text-4xl font-display font-extrabold gradient-text">
          {t('shop.libraryTitle')}
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">
          {profile?.displayName
            ? t('shop.libraryGreeting', { name: profile.displayName })
            : t('shop.librarySubtitle')}
        </p>
      </motion.div>

      {products.length === 0 ? (
        <EmptyState
          emoji="🛍️"
          title={t('shop.libraryEmpty')}
          message={t('shop.libraryEmptyHint')}
          action={
            <Link to="/shop" className="btn-primary">
              <FiShoppingBag /> {t('shop.browseShop')}
            </Link>
          }
        />
      ) : (
        <div className="space-y-4">
          {products.map((product, i) => {
            const files = product.files || [];
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="card"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 shrink-0 rounded-2xl g-mix flex items-center justify-center text-3xl">
                    {product.emoji || '📄'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-lg text-slate-800 dark:text-white">
                      {localized(product, 'title', lang)}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                      {localized(product, 'description', lang)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {product.type === PRODUCT_TYPES.LESSON && files.length > 0 && (
                    <button
                      type="button"
                      onClick={() => handleOpenLesson(product)}
                      disabled={busyFile === files[0].path}
                      className="btn-primary w-full !py-2 !text-sm"
                    >
                      <FiPlayCircle /> {t('shop.openLesson')}
                    </button>
                  )}

                  {product.type !== PRODUCT_TYPES.LESSON &&
                    files.map((file) => (
                      <button
                        key={file.path}
                        type="button"
                        onClick={() => handleDownload(file)}
                        disabled={busyFile === file.path}
                        className="w-full flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-primary-50 dark:hover:bg-slate-700 transition-colors text-start"
                      >
                        <FiDownload className="text-primary-500 shrink-0" />
                        <span className="flex-1 text-sm font-semibold text-slate-700 dark:text-slate-200 break-all">
                          {file.name}
                        </span>
                        {file.size > 0 && (
                          <span className="text-xs text-slate-400 shrink-0" dir="ltr">
                            {formatFileSize(file.size)}
                          </span>
                        )}
                        {busyFile === file.path && (
                          <span className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin shrink-0" />
                        )}
                      </button>
                    ))}

                  {product.type === PRODUCT_TYPES.LINK && product.externalUrl && (
                    <a
                      href={product.externalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary w-full !py-2 !text-sm"
                    >
                      <FiExternalLink /> {t('shop.openLink')}
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Order history — a pending order is what the teacher reviews manually */}
      {orders.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-display font-extrabold text-slate-800 dark:text-white mb-4">
            🧾 {t('shop.myOrders')}
          </h2>
          <div className="space-y-3">
            {orders.map((order) => {
              const meta = ORDER_STATUS_META[order.status] || ORDER_STATUS_META.pending;
              return (
                <div
                  key={order.id}
                  className="card !p-4 flex flex-wrap items-center gap-3"
                >
                  <div className="flex-1 min-w-[12rem]">
                    <p className="font-bold text-slate-800 dark:text-white">
                      {order.productTitle}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {formatDate(order.createdAt, lang)} • {formatPrice(order.price, lang)}
                      {order.reference ? ` • ${order.reference}` : ''}
                    </p>
                  </div>
                  <span className={`badge ${meta.badge}`}>
                    {meta.emoji} {t(`shop.status.${order.status}`)}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-slate-400 mt-3">
            {orders.some((o) => o.status === ORDER_STATUS.PENDING)
              ? t('shop.pendingHint')
              : t('shop.manualNotice')}
          </p>
        </section>
      )}

      {openLesson && (
        <LessonViewer lesson={openLesson} onClose={() => setOpenLesson(null)} />
      )}
    </PageTransition>
  );
};

export default MyLibraryPage;
