// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHAvDKV8x8YkMAbMm0Kbz5Vg3h46K3wEw",
  authDomain: "lde-server.firebaseapp.com",
  databaseURL: "https://lde-server-default-rtdb.firebaseio.com/",
  projectId: "lde-server",
  storageBucket: "lde-server.firebasestorage.app",
  messagingSenderId: "716722646136",
  appId: "1:716722646136:web:88212e3e8126a5dfbcd18d",
  measurementId: "G-LYCHDM01F3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
