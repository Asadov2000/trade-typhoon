const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const verifyTelegramData = require('../utils/telegram');

const router = express.Router();

router.post('/auth', verifyTelegramData, async (req, res) => {
  const { id, first_name, last_name, username, photo_url } = req.telegramUser;
  const user = await User.findOneAndUpdate(
    { telegram_id: id },
    {
      $setOnInsert: {
        username,
        avatar: photo_url,
        first_name,
        last_name,
      },
    },
    { upsert: true, new: true }
  );

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
  res.json({ token, user: { telegram_id: user.telegram_id, username: user.username } });
});

module.exports = router;