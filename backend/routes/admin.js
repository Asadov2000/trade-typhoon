// backend/routes/admin.js
const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middleware/adminAuth');
const User = require('../models/User');

// Получение всех пользователей
router.get('/users', verifyAdmin, async (req, res) => {
  const users = await User.find().select('-__v -password');
  res.json(users);
});

// Бан пользователя
router.post('/ban', verifyAdmin, async (req, res) => {
  const { userId } = req.body;
  await User.findByIdAndUpdate(userId, { banned: true });
  res.json({ success: true });
});

module.exports = router;