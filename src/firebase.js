// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Importando o Firestore

// Configuração do Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDQ6SQRMcnoDnBczExj4MBGT5uF3udPE18',
  authDomain: 'photoflow-5bab9.firebaseapp.com',
  projectId: 'photoflow-5bab9',
  storageBucket: 'photoflow-5bab9.firebasestorage.app',
  messagingSenderId: '462801494410',
  appId: '1:462801494410:web:4a1ee6dd0d01d3f610a873',
  measurementId: 'G-HFF4K0F18Z',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);  // Configurando o Firestore
const analytics = getAnalytics(app);

export { auth, firestore };  // Exportando o firestore
