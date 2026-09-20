// =========================================================
// PalBook Shop — shared constants and helpers
// Created by T. Wad Refae
// =========================================================
// The shop sells study material. Payment goes through iBuraq and is
// confirmed manually by the teacher; a confirmed order grants an
// entitlement document, and that document is what unlocks the files.

export const CURRENCY = 'ILS';
export const CURRENCY_SYMBOL = '₪';

// Firestore collections used by the shop
export const PRODUCTS_COLLECTION = 'products';
export const ORDERS_COLLECTION = 'orders';
export const ENTITLEMENTS_COLLECTION = 'entitlements';
export const SETTINGS_COLLECTION = 'settings';
export const SHOP_SETTINGS_DOC = 'shop';

// Root folder of paid files in Firebase Storage. Never put paid material in
// the public palbook-lessons repo — it is served on GitHub Pages to everyone.
export const PRODUCTS_STORAGE_ROOT = 'products';

export const PRODUCT_TYPES = {
  PDF: 'pdf',        // one or more downloadable files
  LESSON: 'lesson',  // interactive HTML shown inside the site
  BUNDLE: 'bundle',  // a package of several files
  LINK: 'link',      // an external link handed over after purchase
};

export const PRODUCT_TYPE_META = {
  [PRODUCT_TYPES.PDF]: { emoji: '📄', labelKey: 'shop.typePdf' },
  [PRODUCT_TYPES.LESSON]: { emoji: '🖥️', labelKey: 'shop.typeLesson' },
  [PRODUCT_TYPES.BUNDLE]: { emoji: '📦', labelKey: 'shop.typeBundle' },
  [PRODUCT_TYPES.LINK]: { emoji: '🔗', labelKey: 'shop.typeLink' },
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  REJECTED: 'rejected',
};

export const ORDER_STATUS_META = {
  [ORDER_STATUS.PENDING]: {
    emoji: '⏳',
    badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
  },
  [ORDER_STATUS.CONFIRMED]: {
    emoji: '✅',
    badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200',
  },
  [ORDER_STATUS.REJECTED]: {
    emoji: '❌',
    badge: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200',
  },
};

// Payment details shown on the checkout page. The teacher edits these from the
// dashboard (settings/shop); these values are only the fallback.
export const DEFAULT_SHOP_SETTINGS = {
  enabled: true,
  walletName: 'T. Wad Refae',
  walletNumber: '',
  whatsapp: '',
  instructions: '',
  instructionsAr: '',
};

// One entitlement per buyer per product. The id is rebuilt inside the Storage
// security rules, so its shape must stay exactly `<uid>_<productId>`.
export const entitlementId = (uid, productId) => `${uid}_${productId}`;

// Storage path of a product file. Keeping the product id as the first folder
// lets the Storage rules read it straight out of the path.
export const productFilePath = (productId, fileName) =>
  `${PRODUCTS_STORAGE_ROOT}/${productId}/${fileName}`;

// A safe file name: Arabic and Latin letters, digits, dot, dash, underscore.
export const safeFileName = (name = '') =>
  name
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}._-]/gu, '')
    .slice(0, 120) || `file-${Date.now()}`;

// Product ids double as Storage folder names and as part of the entitlement id,
// so they stay lowercase ASCII.
export const slugify = (value = '') =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);

export const formatPrice = (price, lang = 'ar') => {
  const value = Number(price) || 0;
  if (value === 0) return lang === 'ar' ? 'مجاني' : 'Free';
  const rounded = Number.isInteger(value) ? value : value.toFixed(2);
  return `${rounded} ${CURRENCY_SYMBOL}`;
};

export const formatFileSize = (bytes) => {
  const size = Number(bytes) || 0;
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(0)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

// Firestore timestamps, ISO strings and Date objects all reach the UI.
export const formatDate = (value, lang = 'ar') => {
  if (!value) return '';
  const date = value?.toDate?.() || (value?.seconds ? new Date(value.seconds * 1000) : new Date(value));
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Title/description in the reader's language, falling back to the other one.
export const localized = (item, field, lang = 'ar') => {
  if (!item) return '';
  const arField = `${field}Ar`;
  return lang === 'ar' ? item[arField] || item[field] || '' : item[field] || item[arField] || '';
};
