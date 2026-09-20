// =========================================================
// PalBook Shop — Firestore + Storage access layer
// Created by T. Wad Refae
// =========================================================
// Flow: a buyer pays through iBuraq and submits the transfer reference, which
// creates a `pending` order. The teacher confirms it from the dashboard, and
// that confirmation writes an entitlement document. Storage rules read the
// entitlement, so a paid file stays unreachable for everyone else — even with
// a direct link.

import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  writeBatch,
  serverTimestamp,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getBlob,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { db, storage } from './config';
import { STATIC_PRODUCTS } from '../data/products';
import {
  PRODUCTS_COLLECTION,
  ORDERS_COLLECTION,
  ENTITLEMENTS_COLLECTION,
  SETTINGS_COLLECTION,
  SHOP_SETTINGS_DOC,
  DEFAULT_SHOP_SETTINGS,
  ORDER_STATUS,
  CURRENCY,
  entitlementId,
  productFilePath,
  safeFileName,
} from '../utils/shop';

const byNewest = (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);

// ───────────────────────── Products ─────────────────────────

// Firestore catalogue merged with the static fallback (Firestore wins on id).
export const getProducts = async ({ includeUnpublished = false } = {}) => {
  let registered = [];
  try {
    const snapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    registered = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('Failed to load products:', err);
  }

  const registeredIds = new Set(registered.map((p) => p.id));
  const fallbacks = STATIC_PRODUCTS.filter((p) => !registeredIds.has(p.id));
  const all = [...registered, ...fallbacks].sort(byNewest);

  return includeUnpublished ? all : all.filter((p) => p.published !== false);
};

export const getProduct = async (productId) => {
  if (!productId) return null;
  try {
    const snapshot = await getDoc(doc(db, PRODUCTS_COLLECTION, productId));
    if (snapshot.exists()) return { id: snapshot.id, ...snapshot.data() };
  } catch (err) {
    console.error('Failed to load product:', err);
  }
  return STATIC_PRODUCTS.find((p) => p.id === productId) || null;
};

// Create or edit a product. The id is chosen by the teacher (it is also the
// Storage folder), so setDoc with merge is used instead of addDoc.
export const saveProduct = async (productId, data) => {
  const productRef = doc(db, PRODUCTS_COLLECTION, productId);
  const existing = await getDoc(productRef);
  await setDoc(
    productRef,
    {
      ...data,
      ...(existing.exists() ? {} : { createdAt: serverTimestamp() }),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
  return productId;
};

export const deleteProduct = async (productId) => {
  await deleteDoc(doc(db, PRODUCTS_COLLECTION, productId));
};

// ─────────────────────── Product files ───────────────────────

export const uploadProductFile = async (productId, file) => {
  const name = safeFileName(file.name);
  const path = productFilePath(productId, name);
  const snapshot = await uploadBytes(ref(storage, path), file, {
    contentType: file.type || 'application/octet-stream',
  });
  return {
    name,
    path,
    size: snapshot.metadata.size || file.size || 0,
    contentType: snapshot.metadata.contentType || file.type || '',
  };
};

export const deleteProductFile = async (path) => {
  try {
    await deleteObject(ref(storage, path));
  } catch (err) {
    // A missing object should not block removing the file from the product.
    console.error('Failed to delete file:', err);
  }
};

// Download a paid file. getBlob keeps every request under the Storage rules,
// so no shareable public link is ever produced — but it needs CORS configured
// on the bucket (see README). Where that is missing we fall back to a signed
// download URL, which still requires the buyer to be entitled to obtain it.
export const downloadProductFile = async (file) => {
  const fileRef = ref(storage, file.path);
  try {
    const blob = await getBlob(fileRef);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name || 'palbook-file';
    document.body.appendChild(link);
    link.click();
    link.remove();
    // Revoke late so the browser has started the download.
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
    return { method: 'blob' };
  } catch (err) {
    console.warn('Blob download unavailable, falling back to a download URL:', err);
    const url = await getDownloadURL(fileRef);
    window.open(url, '_blank', 'noopener');
    return { method: 'url', url };
  }
};

// Used by the viewer to display an interactive HTML product in an iframe.
export const getProductFileUrl = (path) => getDownloadURL(ref(storage, path));

// ───────────────────────── Orders ─────────────────────────

// Buyers may only ever create a pending order; the status is the teacher's to
// change, and the rules enforce that too.
export const createOrder = async ({ uid, product, buyer }) => {
  const payload = {
    uid,
    productId: product.id,
    productTitle: product.title || product.titleAr || product.id,
    price: Number(product.price) || 0,
    currency: CURRENCY,
    paymentMethod: 'iburaq',
    buyerName: buyer.name?.trim() || '',
    buyerEmail: buyer.email?.trim() || '',
    buyerPhone: buyer.phone?.trim() || '',
    reference: buyer.reference?.trim() || '',
    note: buyer.note?.trim() || '',
    status: ORDER_STATUS.PENDING,
    createdAt: serverTimestamp(),
  };
  const docRef = await addDoc(collection(db, ORDERS_COLLECTION), payload);
  return docRef.id;
};

export const getMyOrders = async (uid) => {
  if (!uid) return [];
  const snapshot = await getDocs(
    query(collection(db, ORDERS_COLLECTION), where('uid', '==', uid))
  );
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() })).sort(byNewest);
};

// Teacher view. Sorting happens here so no composite index is needed.
export const getAllOrders = async () => {
  const snapshot = await getDocs(collection(db, ORDERS_COLLECTION));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() })).sort(byNewest);
};

// Confirming a payment is one atomic step: the order is marked confirmed and
// the entitlement that unlocks the files is written alongside it.
export const confirmOrder = async (order, teacherUid) => {
  const batch = writeBatch(db);
  batch.update(doc(db, ORDERS_COLLECTION, order.id), {
    status: ORDER_STATUS.CONFIRMED,
    reviewedBy: teacherUid,
    reviewNote: '',
    updatedAt: serverTimestamp(),
  });
  batch.set(doc(db, ENTITLEMENTS_COLLECTION, entitlementId(order.uid, order.productId)), {
    uid: order.uid,
    productId: order.productId,
    orderId: order.id,
    grantedBy: teacherUid,
    grantedAt: serverTimestamp(),
  });
  await batch.commit();
};

// Rejecting also removes any entitlement from an earlier confirmation, so a
// mistaken confirm can be taken back.
export const rejectOrder = async (order, teacherUid, reason = '') => {
  const batch = writeBatch(db);
  batch.update(doc(db, ORDERS_COLLECTION, order.id), {
    status: ORDER_STATUS.REJECTED,
    reviewedBy: teacherUid,
    reviewNote: reason,
    updatedAt: serverTimestamp(),
  });
  batch.delete(doc(db, ENTITLEMENTS_COLLECTION, entitlementId(order.uid, order.productId)));
  await batch.commit();
};

export const deleteOrder = async (orderId) => {
  await deleteDoc(doc(db, ORDERS_COLLECTION, orderId));
};

// ─────────────────────── Entitlements ───────────────────────

export const getMyEntitlements = async (uid) => {
  if (!uid) return [];
  const snapshot = await getDocs(
    query(collection(db, ENTITLEMENTS_COLLECTION), where('uid', '==', uid))
  );
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const hasEntitlement = async (uid, productId) => {
  if (!uid || !productId) return false;
  try {
    const snapshot = await getDoc(
      doc(db, ENTITLEMENTS_COLLECTION, entitlementId(uid, productId))
    );
    return snapshot.exists();
  } catch {
    return false;
  }
};

// ───────────────────── Shop settings ─────────────────────

export const getShopSettings = async () => {
  try {
    const snapshot = await getDoc(doc(db, SETTINGS_COLLECTION, SHOP_SETTINGS_DOC));
    if (snapshot.exists()) return { ...DEFAULT_SHOP_SETTINGS, ...snapshot.data() };
  } catch (err) {
    console.error('Failed to load shop settings:', err);
  }
  return { ...DEFAULT_SHOP_SETTINGS };
};

export const saveShopSettings = async (settings) => {
  await setDoc(
    doc(db, SETTINGS_COLLECTION, SHOP_SETTINGS_DOC),
    { ...settings, updatedAt: serverTimestamp() },
    { merge: true }
  );
};
