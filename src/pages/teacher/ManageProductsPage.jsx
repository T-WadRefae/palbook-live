import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import {
  FiEdit2,
  FiEyeOff,
  FiPlus,
  FiSave,
  FiTrash2,
  FiUploadCloud,
  FiX,
} from 'react-icons/fi';
import PageTransition from '../../components/common/PageTransition';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import GradeMultiSelect from '../../components/common/GradeMultiSelect';
import {
  deleteProduct,
  deleteProductFile,
  getProducts,
  getShopSettings,
  saveProduct,
  saveShopSettings,
  uploadProductFile,
} from '../../firebase/shop';
import {
  DEFAULT_SHOP_SETTINGS,
  PRODUCT_TYPES,
  PRODUCT_TYPE_META,
  formatFileSize,
  formatPrice,
  slugify,
} from '../../utils/shop';
import { LESSON_EMOJIS } from '../../utils/constants';

const emptyForm = {
  id: '',
  emoji: '📄',
  type: PRODUCT_TYPES.PDF,
  price: '',
  grades: [],
  title: '',
  titleAr: '',
  description: '',
  descriptionAr: '',
  externalUrl: '',
  published: true,
  files: [],
};

const ManageProductsPage = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const fileInputRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [settings, setSettings] = useState(DEFAULT_SHOP_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState('');
  const [showForm, setShowForm] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const load = async () => {
    setLoading(true);
    try {
      const [list, shopSettings] = await Promise.all([
        getProducts({ includeUnpublished: true }),
        getShopSettings(),
      ]);
      setProducts(list);
      setSettings(shopSettings);
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

  const startCreate = () => {
    setForm(emptyForm);
    setEditingId('');
    setShowForm(true);
  };

  const startEdit = (product) => {
    setForm({ ...emptyForm, ...product, price: String(product.price ?? '') });
    setEditingId(product.id);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setForm(emptyForm);
    setEditingId('');
  };

  // Files are uploaded straight away; the product document stores their paths.
  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const productId = editingId || slugify(form.id);
    if (!productId) {
      toast.error(t('shop.idFirst'));
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setUploading(true);
    try {
      const uploaded = [];
      for (const file of files) {
        uploaded.push(await uploadProductFile(productId, file));
      }
      setForm((f) => ({
        ...f,
        id: productId,
        // Re-uploading the same name replaces the old entry.
        files: [...f.files.filter((x) => !uploaded.some((u) => u.path === x.path)), ...uploaded],
      }));
      toast.success(t('shop.fileUploaded'));
    } catch (err) {
      console.error(err);
      toast.error(t('shop.uploadFailed'));
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = async (file) => {
    if (!window.confirm(t('shop.confirmDeleteFile'))) return;
    await deleteProductFile(file.path);
    setForm((f) => ({ ...f, files: f.files.filter((x) => x.path !== file.path) }));
    toast.success(t('shop.fileDeleted'));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const productId = editingId || slugify(form.id);
    if (!productId) {
      toast.error(t('shop.idRequired'));
      return;
    }
    if (!form.title.trim() && !form.titleAr.trim()) {
      toast.error(t('shop.titleRequired'));
      return;
    }

    setSaving(true);
    try {
      // The id is the document key, not a field inside it.
      const rest = { ...form };
      delete rest.id;
      await saveProduct(productId, {
        ...rest,
        price: Number(form.price) || 0,
        grades: form.grades.map(Number),
      });
      toast.success(t('shop.productSaved'));
      closeForm();
      await load();
    } catch (err) {
      console.error(err);
      toast.error(t('common.error'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm(t('shop.confirmDeleteProduct'))) return;
    try {
      // Remove the files too, so nothing paid for is left in Storage.
      for (const file of product.files || []) {
        await deleteProductFile(file.path);
      }
      await deleteProduct(product.id);
      toast.success(t('shop.productDeleted'));
      await load();
    } catch (err) {
      console.error(err);
      toast.error(t('common.error'));
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      await saveShopSettings(settings);
      toast.success(t('shop.settingsSaved'));
    } catch (err) {
      console.error(err);
      toast.error(t('common.error'));
    } finally {
      setSavingSettings(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <PageTransition>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-extrabold text-slate-800 dark:text-white">
            🛍️ {t('shop.manageTitle')}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t('shop.manageSubtitle')}
          </p>
        </div>
        <button type="button" onClick={startCreate} className="btn-primary !py-2 !px-4 !text-sm">
          <FiPlus /> {t('shop.newProduct')}
        </button>
      </div>

      {/* ───── iBuraq payment details shown to buyers at checkout ───── */}
      <form onSubmit={handleSaveSettings} className="card mb-8 space-y-4">
        <h2 className="font-bold text-lg text-slate-800 dark:text-white">
          💳 {t('shop.paymentSettings')}
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">{t('shop.walletName')}</label>
            <input
              type="text"
              value={settings.walletName || ''}
              onChange={(e) => setSettings({ ...settings, walletName: e.target.value })}
              className="input"
            />
          </div>
          <div>
            <label className="label">{t('shop.walletNumber')} (iBuraq)</label>
            <input
              type="text"
              value={settings.walletNumber || ''}
              onChange={(e) => setSettings({ ...settings, walletNumber: e.target.value })}
              className="input"
              dir="ltr"
            />
          </div>
          <div>
            <label className="label">{t('shop.whatsapp')}</label>
            <input
              type="text"
              value={settings.whatsapp || ''}
              onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
              className="input"
              dir="ltr"
              placeholder="970599..."
            />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 font-semibold text-sm text-slate-700 dark:text-slate-200">
              <input
                type="checkbox"
                checked={settings.enabled !== false}
                onChange={(e) => setSettings({ ...settings, enabled: e.target.checked })}
                className="w-5 h-5 rounded"
              />
              {t('shop.shopEnabled')}
            </label>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">{t('shop.instructionsAr')}</label>
            <textarea
              value={settings.instructionsAr || ''}
              onChange={(e) => setSettings({ ...settings, instructionsAr: e.target.value })}
              rows={3}
              className="input resize-none"
            />
          </div>
          <div>
            <label className="label">{t('shop.instructionsEn')}</label>
            <textarea
              value={settings.instructions || ''}
              onChange={(e) => setSettings({ ...settings, instructions: e.target.value })}
              rows={3}
              className="input resize-none"
              dir="ltr"
            />
          </div>
        </div>

        <button type="submit" disabled={savingSettings} className="btn-primary !py-2 !px-4 !text-sm">
          <FiSave /> {t('common.save')}
        </button>
      </form>

      {/* ───── Product form ───── */}
      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSave}
          className="card mb-8 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg text-slate-800 dark:text-white">
              {editingId ? `✏️ ${t('shop.editProduct')}` : `➕ ${t('shop.newProduct')}`}
            </h2>
            <button
              type="button"
              onClick={closeForm}
              className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center"
              aria-label={t('common.close')}
            >
              <FiX />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">{t('shop.productId')}</label>
              <input
                type="text"
                value={form.id}
                onChange={(e) => setForm({ ...form, id: e.target.value })}
                onBlur={(e) => setForm({ ...form, id: slugify(e.target.value) })}
                className="input"
                dir="ltr"
                placeholder="grade5-unit2-worksheets"
                disabled={!!editingId}
                required
              />
              <p className="text-xs text-slate-400 mt-1">{t('shop.productIdHint')}</p>
            </div>

            <div>
              <label className="label">{t('shop.price')}</label>
              <input
                type="number"
                min="0"
                step="1"
                value={form.price}
                onChange={update('price')}
                className="input"
                dir="ltr"
                required
              />
            </div>

            <div>
              <label className="label">{t('shop.productType')}</label>
              <select value={form.type} onChange={update('type')} className="input">
                {Object.values(PRODUCT_TYPES).map((type) => (
                  <option key={type} value={type}>
                    {PRODUCT_TYPE_META[type].emoji} {t(PRODUCT_TYPE_META[type].labelKey)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">{t('upload.thumbnail')}</label>
              <div className="flex flex-wrap gap-1.5">
                {['📄', '📦', '🖥️', '🔗', ...LESSON_EMOJIS].map((emoji, idx) => (
                  <button
                    key={`${emoji}-${idx}`}
                    type="button"
                    onClick={() => setForm({ ...form, emoji })}
                    className={`w-10 h-10 rounded-xl text-xl border-2 transition-all ${
                      form.emoji === emoji
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label">{t('upload.lessonTitle')}</label>
              <input type="text" value={form.title} onChange={update('title')} className="input" dir="ltr" />
            </div>

            <div>
              <label className="label">{t('upload.lessonTitleAr')}</label>
              <input type="text" value={form.titleAr} onChange={update('titleAr')} className="input" />
            </div>

            <div>
              <label className="label">{t('upload.description')} (EN)</label>
              <textarea
                value={form.description}
                onChange={update('description')}
                rows={3}
                className="input resize-none"
                dir="ltr"
              />
            </div>

            <div>
              <label className="label">{t('upload.description')} (AR)</label>
              <textarea
                value={form.descriptionAr}
                onChange={update('descriptionAr')}
                rows={3}
                className="input resize-none"
              />
            </div>
          </div>

          <div>
            <label className="label">{t('upload.grades')}</label>
            <GradeMultiSelect
              value={form.grades.map(Number)}
              onChange={(grades) => setForm({ ...form, grades })}
            />
          </div>

          {form.type === PRODUCT_TYPES.LINK && (
            <div>
              <label className="label">{t('shop.externalUrl')}</label>
              <input
                type="url"
                value={form.externalUrl}
                onChange={update('externalUrl')}
                className="input"
                dir="ltr"
                placeholder="https://"
              />
              <p className="text-xs text-slate-400 mt-1">{t('shop.externalUrlHint')}</p>
            </div>
          )}

          {/* Paid files live in Firebase Storage, never in the public lessons repo */}
          {form.type !== PRODUCT_TYPES.LINK && (
            <div>
              <label className="label">{t('shop.files')}</label>
              <div className="space-y-2 mb-3">
                {form.files.map((file) => (
                  <div
                    key={file.path}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60"
                  >
                    <span className="flex-1 text-sm font-semibold text-slate-700 dark:text-slate-200 break-all">
                      {file.name}
                    </span>
                    {file.size > 0 && (
                      <span className="text-xs text-slate-400 shrink-0" dir="ltr">
                        {formatFileSize(file.size)}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(file)}
                      className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0"
                      aria-label={t('upload.delete')}
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <label className="btn-outline w-full !py-3 cursor-pointer">
                <FiUploadCloud />
                {uploading ? t('upload.uploading') : t('shop.uploadFiles')}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
              <p className="text-xs text-slate-400 mt-1">{t('shop.filesHint')}</p>
            </div>
          )}

          <label className="flex items-center gap-2 font-semibold text-sm text-slate-700 dark:text-slate-200">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
              className="w-5 h-5 rounded"
            />
            {t('shop.published')}
          </label>

          <button type="submit" disabled={saving} className="btn-primary w-full">
            <FiSave /> {t('common.save')}
          </button>
        </motion.form>
      )}

      {/* ───── Product list ───── */}
      {products.length === 0 ? (
        <EmptyState
          emoji="🛍️"
          title={t('shop.noProducts')}
          message={t('shop.noProductsHint')}
          action={
            <button type="button" onClick={startCreate} className="btn-primary">
              <FiPlus /> {t('shop.newProduct')}
            </button>
          }
        />
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product.id} className="card !p-5 flex items-start gap-4">
              <div className="w-14 h-14 shrink-0 rounded-2xl g-mix flex items-center justify-center text-3xl">
                {product.emoji || '📄'}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-800 dark:text-white truncate">
                  {lang === 'ar' ? product.titleAr || product.title : product.title || product.titleAr}
                </h3>
                <p className="text-xs text-slate-400 break-all" dir="ltr">
                  {product.id}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-sm font-extrabold text-primary-600">
                    {formatPrice(product.price, lang)}
                  </span>
                  <span className="badge bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-200">
                    {(product.files || []).length} 📎
                  </span>
                  {product.published === false && (
                    <span className="badge bg-amber-100 text-amber-800">
                      <FiEyeOff size={12} /> {t('shop.hidden')}
                    </span>
                  )}
                  {product.static && (
                    <span className="badge bg-sky-100 text-sky-700">{t('shop.staticProduct')}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => startEdit(product)}
                  className="w-9 h-9 rounded-xl bg-accent-100 text-accent-700 flex items-center justify-center"
                  aria-label={t('upload.edit')}
                >
                  <FiEdit2 size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(product)}
                  className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center"
                  aria-label={t('upload.delete')}
                >
                  <FiTrash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageTransition>
  );
};

export default ManageProductsPage;
