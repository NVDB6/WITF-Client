import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjXMdip7htojpy08kJo4F0qCfuYesV8l0",
  authDomain: "witf-ba054.firebaseapp.com",
  projectId: "witf-ba054",
  storageBucket: "witf-ba054.appspot.com",
  messagingSenderId: "526255059435",
  appId: "1:526255059435:web:7c336355cc780ef38b29ae",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { app, db };
