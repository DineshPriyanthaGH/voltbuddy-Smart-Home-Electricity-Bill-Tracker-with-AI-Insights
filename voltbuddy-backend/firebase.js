// firebase.js
const admin = require('firebase-admin');

if (!admin.apps.length) {
  // Initialize Firebase Admin SDK with your service account credentials
  const serviceAccount = require('./config/voltbuddy-firebase-adminsdk.json');  // Use the correct path to the JSON file

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const auth = admin.auth();  // Firebase authentication instance

module.exports = { auth };
