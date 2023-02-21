import { getAnalytics } from "firebase/analytics";
import "firebase/compat/auth";
import "firebase/auth";
import firebase from "firebase/compat/app";
// import firebaseConfig from "../../firebase.config.js";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "express-mdn.firebaseapp.com",
  projectId: "express-mdn",
  storageBucket: "express-mdn.appspot.com",
  messagingSenderId: "30505840910",
  appId: "1:30505840910:web:50967432d19bd90b7ea75f",
  measurementId: "G-3305S8SJRK",
};

// Initialize Firebase with the firebase SDK

firebase.initializeApp(firebaseConfig);

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export default firebase;
