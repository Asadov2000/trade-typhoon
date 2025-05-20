// backend/middleware/adminAuth.js
const admin = require('../utils/firebaseAdmin');

const verifyAdmin = async (req, res, next) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (decodedToken.email === process.env.ADMIN_EMAIL) {
      req.admin = decodedToken;
      next();
    } else {
      res.status(403).json({ error: 'Доступ запрещен' });
    }
  } catch (err) {
    res.status(401).json({ error: 'Неверный токен' });
  }
};

module.exports = verifyAdmin;