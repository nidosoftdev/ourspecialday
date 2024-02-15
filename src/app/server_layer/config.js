
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC2bFScRS0Yvmv7bCc7gYtedjQMaai8BIA",
  authDomain: "ourspecialevent-5215f.firebaseapp.com",
  projectId: "ourspecialevent-5215f",
  storageBucket: "ourspecialevent-5215f.appspot.com",
  messagingSenderId: "523091654173",
  appId: "1:523091654173:web:66db3fca4af2b9e78cf8f4",
  measurementId: "G-DJ9Y1VS9HD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
