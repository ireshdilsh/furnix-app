// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// @ts-ignore
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY_FIREBASE || "your-api-key-here",
  authDomain: "gen-lang-client-0685198186.firebaseapp.com",
  projectId: "gen-lang-client-0685198186",
  storageBucket: "gen-lang-client-0685198186.firebasestorage.app",
  messagingSenderId: "4556193198",
  appId: "1:4556193198:web:60b16a34ee5bf1698d9c3f",
  measurementId: "G-K2BY4B96WE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app)