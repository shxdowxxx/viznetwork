import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyAAfGOD_NX-smXCu_VNHhir4NGM-If2Ie0",
  authDomain: "viznetwork-9be19.firebaseapp.com",
  projectId: "viznetwork-9be19",
  storageBucket: "viznetwork-9be19.firebasestorage.app",
  messagingSenderId: "603466785195",
  appId: "1:603466785195:web:57c252c30c7de0c73c32ee",
  measurementId: "G-2J5R1WVJJK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
