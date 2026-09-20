import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import {
  FiCheck,
  FiMessageCircle,
  FiRefreshCw,
  FiTrash2,
  FiX,
} from 'react-icons/fi';
import PageTransition from '@components/common/PageTransition';
import Loader from '@components/common/Loader';
import EmptyState from '@components/common/EmptyState';
import { useAuth } from '@contexts/AuthContext';
import {
  confirmOrder,
  deleteOrder,
  getAllOrders,
  rejectOrder,
} from '../../api';
import {
  ORDER_STATUS,
  ORDER_STATUS_META,
  formatDate,
  formatPrice,
} from '../../constants';

const ShopOrdersPage = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState('');
  const [filter, setFilter] = useState(ORDER_STATUS.PENDING);

  const load = async () => {
    setLoading(true);
    try {
      setOrders(await getAllOrders());
    } catch (err) {
      console.error(err);
      toast.error(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const counts = useMemo(
    () => ({
      all: orders.length,
      [ORDER_STATUS.PENDING]: orders.filter((o) => o.status === ORDER_STATUS.PENDING).length,
      [ORDER_STATUS.CONFIRMED]: orders.filter((o) => o.status === ORDER_STATUS.CONFIRMED).length,
      [ORDER_STATUS.REJECTED]: orders.filter((o) => o.status === ORDER_STATUS.REJECTED).length,
    }),
    [orders]
  );

  const visible = filter === 'all' ? orders : orders.filter((o) => o.status === filter);

  // Confirming writes the entitlement that unlocks the files for this buyer.
  const handleConfirm = async (order) => {
    setBusyId(order.id);
    try {
      await confirmOrder(order, user.uid);
      toast.success(t('shop.orderConfirmed'));
      await load();
    } catch (err) {
      console.error(err);
      toast.error(t('common.error'));
    } finally {
      setBusyId('');
    }
  };

  // Rejecting also removes an entitlement granted by mistake.
  const handleReject = async (order) => {
    const reason = window.prompt(t('shop.rejectReason'), '');
    if (reason === null) return;
    setBusyId(order.id);
    try {
      await rejectOrder(order, user.uid, reason);
      toast.success(t('shop.orderRejected'));
      await load();
    } catch (err) {
      console.error(err);
      toast.error(t('common.error'));
    } finally {
      setBusyId('');
    }
  };

  const handleDelete = async (order) => {
    if (!window.confirm(t('shop.confirmDeleteOrder'))) return;
    setBusyId(order.id);
    try {
      await deleteOrder(order.id);
      toast.success(t('shop.orderDeleted'));
      await load();
    } catch (err) {
      console.error(err);
      toast.error(t('common.error'));
    } finally {
      setBusyId('');
    }
  };

  const tabs = [
    { key: ORDER_STATUS.PENDING, label: t('shop.status.pending'), emoji: '⏳' },
    { key: ORDER_STATUS.CONFIRMED, label: t('shop.status.confirmed'), emoji: '✅' },
    { key: ORDER_STATUS.REJECTED, label: t('shop.status.rejected'), emoji: '❌' },
    { key: 'all', label: t('common.all'), emoji: '📋' },
  ];

  return (
    <PageTransition>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-extrabold text-slate-800 dark:text-white">
            🧾 {t('shop.ordersTitle')}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t('shop.ordersSubtitle')}
          </p>
        </div>
        <button type="button" onClick={load} className="btn-outline !py-2 !px-4 !text-sm">
          <FiRefreshCw /> {t('shop.refresh')}
        </button>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-2xl text-sm font-bold border-2 transition-all ${
              filter === tab.key
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white border-primary-600 shadow-kid'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
            }`}
          >
            {tab.emoji} {tab.label} ({counts[tab.key] || 0})
          </button>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : visible.length === 0 ? (
        <EmptyState emoji="🧾" title={t('shop.noOrders')} message={t('shop.noOrdersHint')} />
      ) : (
        <div className="space-y-4">
          {visible.map((order, i) => {
            const meta = ORDER_STATUS_META[order.status] || ORDER_STATUS_META.pending;
            const busy = busyId === order.id;
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="card !p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div className="min-w-[12rem]">
                    <h2 className="font-bold text-slate-800 dark:text-white">
                      {order.productTitle}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {formatDate(order.createdAt, lang)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-extrabold text-primary-600">
                      {formatPrice(order.price, lang)}
                    </span>
                    <span className={`badge ${meta.badge}`}>
                      {meta.emoji} {t(`shop.status.${order.status}`)}
                    </span>
                  </div>
                </div>

                <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm mb-4">
                  <div className="flex gap-2">
                    <dt className="text-slate-500 dark:text-slate-400">{t('shop.buyerName')}:</dt>
                    <dd className="font-semibold text-slate-800 dark:text-slate-100">
                      {order.buyerName || '—'}
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-slate-500 dark:text-slate-400">{t('shop.buyerPhone')}:</dt>
                    <dd className="font-semibold text-slate-800 dark:text-slate-100" dir="ltr">
                      {order.buyerPhone || '—'}
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-slate-500 dark:text-slate-400">{t('shop.reference')}:</dt>
                    <dd className="font-semibold text-slate-800 dark:text-slate-100" dir="ltr">
                      {order.reference || '—'}
                    </dd>
                  </div>
                  <div className="flex gap-2 min-w-0">
                    <dt className="text-slate-500 dark:text-slate-400">{t('auth.email')}:</dt>
                    <dd className="font-semibold text-slate-800 dark:text-slate-100 truncate" dir="ltr">
                      {order.buyerEmail || '—'}
                    </dd>
                  </div>
                  {order.note && (
                    <div className="flex gap-2 sm:col-span-2">
                      <dt className="text-slate-500 dark:text-slate-400">{t('shop.note')}:</dt>
                      <dd className="text-slate-700 dark:text-slate-200">{order.note}</dd>
                    </div>
                  )}
                  {order.reviewNote && (
                    <div className="flex gap-2 sm:col-span-2">
                      <dt className="text-slate-500 dark:text-slate-400">{t('shop.rejectNote')}:</dt>
                      <dd className="text-slate-700 dark:text-slate-200">{order.reviewNote}</dd>
                    </div>
                  )}
                </dl>

                <div className="flex flex-wrap gap-2">
                  {order.status !== ORDER_STATUS.CONFIRMED && (
                    <button
                      type="button"
                      onClick={() => handleConfirm(order)}
                      disabled={busy}
                      className="btn-primary !py-2 !px-4 !text-sm"
                    >
                      <FiCheck /> {t('shop.confirmPayment')}
                    </button>
                  )}
                  {order.status !== ORDER_STATUS.REJECTED && (
                    <button
                      type="button"
                      onClick={() => handleReject(order)}
                      disabled={busy}
                      className="btn !py-2 !px-4 !text-sm bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-200"
                    >
                      <FiX /> {t('shop.rejectOrder')}
                    </button>
                  )}
                  {order.buyerPhone && (
                    <a
                      href={`https://wa.me/${order.buyerPhone.replace(/[^\d]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn !py-2 !px-4 !text-sm bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-200"
                    >
                      <FiMessageCircle /> {t('shop.messageBuyer')}
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDelete(order)}
                    disabled={busy}
                    className="btn !py-2 !px-4 !text-sm bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200"
                    aria-label={t('upload.delete')}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </PageTransition>
  );
};

export default ShopOrdersPage;
