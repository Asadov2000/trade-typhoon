const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Получение профиля пользователя
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Токен отсутствует' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-__v');
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' });

    res.json(user);
  } catch (err) {
    res.status(401).json({ error: 'Неверный токен' });
  }
});

module.exports = router;