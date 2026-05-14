import {
  ref,
  uploadBytes,
  uploadString,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { storage } from './config';

/**
 * Upload an HTML lesson file to Firebase Storage
 */
export const uploadLessonFile = async (file, path) => {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return { url, path: snapshot.ref.fullPath };
};

/**
 * Upload raw HTML string as a file
 */
export const uploadHtmlString = async (htmlString, path) => {
  const storageRef = ref(storage, path);
  const snapshot = await uploadString(storageRef, htmlString, 'raw', {
    contentType: 'text/html',
  });
  const url = await getDownloadURL(snapshot.ref);
  return { url, path: snapshot.ref.fullPath };
};

/**
 * Delete a file from Storage
 */
export const deleteLessonFile = async (path) => {
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
};

/**
 * Build a structured path for lesson files
 */
export const buildLessonPath = ({ section, grade, unit, lesson, fileName }) => {
  const safeName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, '_');
  return `lessons/${section}/grade-${grade}/unit-${unit}/lesson-${lesson}/${Date.now()}-${safeName}`;
};
