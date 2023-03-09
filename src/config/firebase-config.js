import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// import Constants from 'expo-constants';

export const firebaseConfig = {
  apiKey: "AIzaSyCZR_lLAlkvtj5CkwxQUtno95gDBqCIxdk",
  authDomain: "crypto-coins-final.firebaseapp.com",
  projectId: "crypto-coins-final",
  storageBucket: "crypto-coins-final.appspot.com",
  messagingSenderId: "1036333593251",
  appId: "1:1036333593251:web:27d76136331114cfbb8516"
};

initializeApp(firebaseConfig);
export const database = getFirestore();