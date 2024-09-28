// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMpZ4KskIDuGB3La_lUme5a8EZ-wvP8hc",
  authDomain: "trip-planner-e445e.firebaseapp.com",
  projectId: "trip-planner-e445e",
  storageBucket: "trip-planner-e445e.appspot.com",
  messagingSenderId: "694345021089",
  appId: "1:694345021089:web:8f72d9fd9373fb8e3822e0",
  measurementId: "G-96EH48Z8R8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);