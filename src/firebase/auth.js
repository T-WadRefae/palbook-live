import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';

/**
 * Register new user (student or teacher)
 */
export const registerUser = async ({ email, password, displayName, role = 'student' }) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, { displayName });

  // Save user metadata to Firestore
  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    email,
    displayName,
    role, // 'student' or 'teacher'
    points: 0,
    achievements: [],
    progress: {},
    createdAt: serverTimestamp(),
    school: 'Surda Basic Mixed School',
  });

  return user;
};

/**
 * Sign in existing user
 */
export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

/**
 * Sign out current user
 */
export const logoutUser = () => signOut(auth);

/**
 * Send password reset email
 */
export const resetPassword = (email) => sendPasswordResetEmail(auth, email);

/**
 * Fetch user profile from Firestore
 */
export const getUserProfile = async (uid) => {
  const userDoc = await getDoc(doc(db, 'users', uid));
  return userDoc.exists() ? userDoc.data() : null;
};
