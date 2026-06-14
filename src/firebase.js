import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfG53dg_KgTI9mlu_nMi4pqnCbIPBcbf8",
  authDomain: "footprinttracker-499405.firebaseapp.com",
  projectId: "footprinttracker-499405",
  storageBucket: "footprinttracker-499405.firebasestorage.app",
  messagingSenderId: "1022849471707",
  appId: "1:1022849471707:web:100f1ff838d9ba60d728fe",
  measurementId: "G-Q1P8B23ML9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
