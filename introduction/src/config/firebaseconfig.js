// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqlWssvGR_xtKhloCmsg_vCjNwWhVZc-E",
  authDomain: "new-firebase-db-project.firebaseapp.com",
  projectId: "new-firebase-db-project",
  storageBucket: "new-firebase-db-project.firebasestorage.app",
  messagingSenderId: "849297922385",
  appId: "1:849297922385:web:7be5aa8a46167c553d1b70"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);