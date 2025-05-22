// firebase.js (Frontend - Client-Side Only Initialization)

import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';

// Firebase configuration (safe to expose)
const firebaseConfig = {
  apiKey: "AIzaSyCfH6Z2UbAR40GybXdO9aDuCLNr2eYnfsM",
  authDomain: "voltbuddy-d8451.firebaseapp.com",
  projectId: "voltbuddy-d8451",
  storageBucket: "voltbuddy-d8451.firebasestorage.app",
  messagingSenderId: "531219870897",
  appId: "1:531219870897:web:5cc44b4b721486f5819e90",
  measurementId: "G-CM4DRWBK5Q"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize reCAPTCHA only in the browser (client-side)
let recaptchaVerifier;

if (typeof window !== 'undefined') {
  recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    size: 'invisible',  // Invisible reCAPTCHA widget
    callback: (response) => {
      console.log('reCAPTCHA verified:', response);
    },
    'expired-callback': () => {
      console.log('reCAPTCHA expired');
    }
  }, auth);

  // Set the flag to disable reCAPTCHA verification for testing (only in development mode)
  if (process.env.NODE_ENV === 'development') {
    window.recaptchaVerifier._appVerificationDisabledForTesting = true;
  }
}

export { auth, recaptchaVerifier };
