// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKY20cmuTYX_-JCOUQwL6VIMOykFMY5sU",
  authDomain: "cineverse-3fa33.firebaseapp.com",
  projectId: "cineverse-3fa33",
  storageBucket: "cineverse-3fa33.firebasestorage.app",
  messagingSenderId: "969956156005",
  appId: "1:969956156005:web:ecff4bf5b57cc615b59c8c",
  measurementId: "G-5FFRKBXGXR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
