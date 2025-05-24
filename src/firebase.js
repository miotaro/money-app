import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWaGd6Txm0nuM7o6kdoNSKKtRF7f5lIQ0",
  authDomain: "money-app-6687e.firebaseapp.com",
  projectId: "money-app-6687e",
  storageBucket: "money-app-6687e.firebasestorage.app",
  messagingSenderId: "776439910594",
  appId: "1:776439910594:web:dd90d29f5a5a4f3503eb5b",
  measurementId: "G-PLFJ5JGVJM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
