const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Получение глобального рейтинга
router.get('/', async (req, res) => {
  try {
    const rating = await User.find()
      .sort({ balance: -1 })
      .limit(100)
      .select('username balance avatar');
    res.json(rating);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Получение рейтинга среди друзей
router.get('/friends', async (req, res) => {
  try {
    const userId = req.query.userId;
    const user = await User.findById(userId).select('friends');
    const friendIds = user.friends.map(f => f.telegram_id);
    
    const friendsRating = await User.find({
      telegram_id: { $in: friendIds }
    }).sort({ balance: -1 });

    res.json(friendsRating);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;