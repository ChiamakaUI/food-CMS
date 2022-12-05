// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, } from "firebase/database"
// import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "food-cms-72035.firebaseapp.com",
  databaseURL: "https://food-cms-72035-default-rtdb.firebaseio.com",
  projectId: "food-cms-72035",
  storageBucket: "food-cms-72035.appspot.com",
  messagingSenderId: "462004269413",
  appId: "1:462004269413:web:83cba687ca3d4f3c5df18c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const database = getDatabase(app);
// export const db = getFirestore(app);
export const storage = getStorage(app);

