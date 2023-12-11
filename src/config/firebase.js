
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB6_mPuHsrgVq1k0gEpH3odal9gOatQKfQ",
  authDomain: "vurboze.firebaseapp.com",
  projectId: "vurboze",
  storageBucket: "vurboze.appspot.com",
  messagingSenderId: "397100620048",
  appId: "1:397100620048:web:ebbaad755b9fb9135aed95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)