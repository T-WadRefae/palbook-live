import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import {
  FiArrowLeft,
  FiCheck,
  FiCopy,
  FiHash,
  FiMessageCircle,
  FiPhone,
  FiSend,
  FiUser,
} from 'react-icons/fi';
import PageTransition from '../../components/common/PageTransition';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import { useAuth } from '../../contexts/AuthContext';
import {
  createOrder,
  getMyOrders,
  getProduct,
  getShopSettings,
  hasEntitlement,
} from '../../firebase/shop';
import { ORDER_STATUS, formatPrice, localized } from '../../utils/shop';

const CheckoutPage = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const [product, setProduct] = useState(null);
  const [settings, setSettings] = useState(null);
  const [pendingOrder, setPendingOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const [form, setForm] = useState({ name: '', phone: '', reference: '', note: '' });
  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [data, shopSettings] = await Promise.all([getProduct(productId), getShopSettings()]);
      setProduct(data);
      setSettings(shopSettings);

      if (user) {
        // Already paid for? Go straight to the library instead of paying twice.
        if (await hasEntitlement(user.uid, productId)) {
          navigate('/library', { replace: true });
          return;
        }
        const orders = await getMyOrders(user.uid);
        setPendingOrder(
          orders.find((o) => o.productId === productId && o.status === ORDER_STATUS.PENDING) || null
        );
      }
      setLoading(false);
    })();
  }, [productId, user, navigate]);

  useEffect(() => {
    setForm((f) => ({ ...f, name: f.name || profile?.displayName || '' }));
  }, [profile?.displayName]);

  const copyWallet = async () => {
    try {
      await navigator.clipboard.writeText(settings.walletNumber);
      setCopied(true);
      toast.success(t('shop.copied'));
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(t('common.error'));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.reference.trim()) {
      toast.error(t('shop.fillRequired'));
      return;
    }
    setSubmitting(true);
    try {
      await createOrder({
        uid: user.uid,
        product,
        buyer: { ...form, email: user.email || '' },
      });
      toast.success(t('shop.orderSent'));
      navigate('/library');
    } catch (err) {
      console.error(err);
      toast.error(t('shop.orderFailed'));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  if (!product) {
    return (
      <PageTransition className="max-w-3xl mx-auto px-4 py-16">
        <EmptyState
          emoji="🔍"
          title={t('shop.notFound')}
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
  const instructions = localized(settings, 'instructions', lang);

  return (
    <PageTransition className="max-w-3xl mx-auto px-4 py-10">
      <Link
        to={`/shop/${product.id}`}
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:underline mb-6"
      >
        <FiArrowLeft className="rtl-flip" /> {t('common.back')}
      </Link>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        {/* Order summary */}
        <div className="card flex items-center gap-4">
          <div className="w-16 h-16 shrink-0 rounded-2xl g-mix flex items-center justify-center text-4xl">
            {product.emoji || '🛍️'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-slate-500 dark:text-slate-400">{t('shop.youAreBuying')}</p>
            <h1 className="text-lg font-bold text-slate-800 dark:text-white truncate">{title}</h1>
          </div>
          <span className="text-2xl font-extrabold text-primary-600 shrink-0">
            {formatPrice(product.price, lang)}
          </span>
        </div>

        {pendingOrder ? (
          <div className="card text-center">
            <div className="text-5xl mb-3">⏳</div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
              {t('shop.alreadyPending')}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-5">
              {t('shop.alreadyPendingHint')}
            </p>
            <Link to="/library" className="btn-primary">
              {t('shop.goToLibrary')}
            </Link>
          </div>
        ) : (
          <>
            {/* Step 1 — pay through iBuraq */}
            <div className="card">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
                <span className="text-primary-600">1.</span> {t('shop.step1Title')}
              </h2>

              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-4 space-y-3">
                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-slate-500 dark:text-slate-400">{t('shop.payTo')}</span>
                  <span className="font-bold text-slate-800 dark:text-white">
                    {settings.walletName || 'T. Wad Refae'}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-slate-500 dark:text-slate-400">{t('shop.walletNumber')}</span>
                  {settings.walletNumber ? (
                    <button
                      type="button"
                      onClick={copyWallet}
                      className="inline-flex items-center gap-2 font-bold text-slate-800 dark:text-white hover:text-primary-600 transition-colors"
                      dir="ltr"
                    >
                      {settings.walletNumber}
                      {copied ? <FiCheck className="text-emerald-500" /> : <FiCopy />}
                    </button>
                  ) : (
                    <span className="text-slate-400">{t('shop.walletMissing')}</span>
                  )}
                </div>

                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-slate-500 dark:text-slate-400">{t('shop.amount')}</span>
                  <span className="font-bold text-primary-600">
                    {formatPrice(product.price, lang)}
                  </span>
                </div>
              </div>

              {instructions && (
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-4 whitespace-pre-line">
                  {instructions}
                </p>
              )}

              {settings.whatsapp && (
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^\d]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline w-full mt-4 !py-2 !text-sm"
                >
                  <FiMessageCircle /> {t('shop.needHelp')}
                </a>
              )}
            </div>

            {/* Step 2 — send the transfer details for manual review */}
            <form onSubmit={handleSubmit} className="card space-y-4">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                <span className="text-primary-600">2.</span> {t('shop.step2Title')}
              </h2>

              <div>
                <label className="label">{t('shop.buyerName')} *</label>
                <div className="relative">
                  <FiUser className="absolute top-1/2 -translate-y-1/2 start-4 text-slate-400" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={update('name')}
                    className="input ps-12"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label">{t('shop.buyerPhone')} *</label>
                <div className="relative">
                  <FiPhone className="absolute top-1/2 -translate-y-1/2 start-4 text-slate-400" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={update('phone')}
                    className="input ps-12"
                    dir="ltr"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label">{t('shop.reference')} *</label>
                <div className="relative">
                  <FiHash className="absolute top-1/2 -translate-y-1/2 start-4 text-slate-400" />
                  <input
                    type="text"
                    value={form.reference}
                    onChange={update('reference')}
                    className="input ps-12"
                    dir="ltr"
                    required
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">{t('shop.referenceHint')}</p>
              </div>

              <div>
                <label className="label">{t('shop.note')}</label>
                <textarea
                  value={form.note}
                  onChange={update('note')}
                  rows={3}
                  className="input resize-none"
                />
              </div>

              <button type="submit" disabled={submitting} className="btn-primary w-full">
                {submitting ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <FiSend className="rtl-flip" /> {t('shop.sendOrder')}
                  </>
                )}
              </button>

              <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                {t('shop.manualNotice')}
              </p>
            </form>
          </>
        )}
      </motion.div>
    </PageTransition>
  );
};

export default CheckoutPage;
