import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCXROpQ_HjyPnn1q-NvYwSVI0KgEsd7dfQ",
  authDomain: "skyluxe-c7856.firebaseapp.com",
  projectId: "skyluxe-c7856",
  storageBucket: "skyluxe-c7856.firebasestorage.app",
  messagingSenderId: "364910273041",
  appId: "1:364910273041:web:5a809a58ce5983de9847b0",
  measurementId: "G-3YFGFJ5S05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;