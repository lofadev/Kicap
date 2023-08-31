// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKBpJGzO0Xgz6IGQfH9mSqCL1EVww9tqM",
  authDomain: "kicap-c7161.firebaseapp.com",
  databaseURL: "https://kicap-c7161-default-rtdb.firebaseio.com",
  projectId: "kicap-c7161",
  storageBucket: "kicap-c7161.appspot.com",
  messagingSenderId: "604160345378",
  appId: "1:604160345378:web:a6f0d426776660700cd17b",
  measurementId: "G-SHD71SJQEH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database };
// Initialize Realtime Database and get a reference to the service
