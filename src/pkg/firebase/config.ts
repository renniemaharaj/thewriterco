// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//
// Configuration is loaded from environment variables first, with fallback to defaults
// Set environment variables in .env.local (copy from .env.example)
// See: https://firebase.google.com/docs/web/setup

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAamHBBrPPRi7PFweCkIuufeTHc3sLfzb4",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "secure.thewriterco.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "thewritercompany",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "thewritercompany.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "134637692475",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:134637692475:web:d835b1f4c7b9e1aaa3de1e",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-LYVNYC1E5K",
};
