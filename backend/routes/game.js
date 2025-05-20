const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const GameSession = require('../models/GameSession');

// Начать новую игру
router.post('/start', authMiddleware, async (req, res) => {
  const session = new GameSession({
    players: [{ user_id: req.user.id, position: 0, properties: [] }],
    board: ['Старт', 'Улица 1', 'Улица 2', 'Тюрьма', 'Улица 3'],
    current_turn: 0,
  });
  await session.save();
  res.json(session);
});

// Ход игрока
router.post('/move', authMiddleware, async (req, res) => {
  const { sessionId } = req.body;
  const session = await GameSession.findById(sessionId);
  const player = session.players.find(p => p.user_id === req.user.id);
  if (!player) return res.status(404).json({ error: 'Игрок не найден' });

  player.position = (player.position + Math.floor(Math.random() * 6) + 1) % session.board.length;
  await session.save();
  res.json(session);
});

// Получить опыт за победу
router.post('/win', authMiddleware, async (req, res) => {
  const { sessionId } = req.body;
  const session = await GameSession.findById(sessionId);
  session.status = 'finished';
  await session.save();

  const user = await User.findById(req.user.id);
  user.experience += 100; // +100 XP за победу
  user.level = Math.floor(1 + user.experience / 1000); // Уровень = опыт / 1000
  await user.save();

  res.json({ experience: user.experience, level: user.level });
});

module.exports = router;