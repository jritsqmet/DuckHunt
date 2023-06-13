import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database"

export const firebaseConfig = {
  apiKey: "AIzaSyBJqEx1lHTLZN-kf1x5vr5MR1Yh705WwQM",
  authDomain: "duck-hunt-78d9b.firebaseapp.com",
  projectId: "duck-hunt-78d9b",
  storageBucket: "duck-hunt-78d9b.appspot.com",
  messagingSenderId: "49015243308",
  appId: "1:49015243308:web:0ae2c0d7fcecad48980789"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getDatabase(app)