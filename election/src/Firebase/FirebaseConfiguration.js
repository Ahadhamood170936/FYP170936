import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


const firebaseConfig = {
  apiKey: "AIzaSyC9-0nK4AiTuLIBopY9J0F5Yj5KJiklP_E",
  authDomain: "test-89dea.firebaseapp.com",
  projectId: "test-89dea",
  storageBucket: "test-89dea.appspot.com",
  messagingSenderId: "9389790609",
  appId: "1:9389790609:web:da5dc2145e605dfccb7630",
  measurementId: "G-9MGD3S0YE8",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
