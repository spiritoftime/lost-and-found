// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBai5lv70vTIgyl2x5zp0FDP-ikqTqKNuM",
  authDomain: "lost-and-found-35cde.firebaseapp.com",
  databaseURL:
    "https://lost-and-found-35cde-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lost-and-found-35cde",
  storageBucket: "lost-and-found-35cde.appspot.com",
  messagingSenderId: "973691901970",
  appId: "1:973691901970:web:bf81f5238761046d2d60cb",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app)
export const storage = getStorage(app)
