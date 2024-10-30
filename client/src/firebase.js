// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "factio-blog.firebaseapp.com",
  projectId: "factio-blog",
  storageBucket: "factio-blog.appspot.com",
  messagingSenderId: "867523985585",
  appId: "1:867523985585:web:8c817576a0bafa65976290"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);