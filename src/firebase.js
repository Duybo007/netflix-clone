// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBe2JK3VlLP1cGSU4YnGOIpYVBQqhrsq2w",
  authDomain: "my-netflix-61dcd.firebaseapp.com",
  projectId: "my-netflix-61dcd",
  storageBucket: "my-netflix-61dcd.appspot.com",
  messagingSenderId: "966914151921",
  appId: "1:966914151921:web:c0ea6205c13b416092e050"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)

