import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDngj5MXeWGhVaONbAIuV1x9frBTp29EAY",
  authDomain: "lucyartweb.firebaseapp.com",
  projectId: "lucyartweb",
  storageBucket: "lucyartweb.firebasestorage.app",
  messagingSenderId: "169026700050",
  appId: "1:169026700050:web:5fbcf631d445f74ed2a9cb"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
