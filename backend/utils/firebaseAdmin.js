// backend/utils/firebaseAdmin.js
const admin = require('firebase-admin');
const serviceAccount = require('./path-to-firebase-key.json'); // Скачайте из Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;