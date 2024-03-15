import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOVcdj542z2x6KgwrA2JMFLrddFZ1cbBY",
  authDomain: "chat-interacao.firebaseapp.com",
  projectId: "chat-interacao",
  storageBucket: "chat-interacao.appspot.com",
  messagingSenderId: "941867498316",
  appId: "1:941867498316:web:f81c03954e25dede2dede9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// Initialize Firebase
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

