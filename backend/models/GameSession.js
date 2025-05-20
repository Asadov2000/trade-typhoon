// backend/models/GameSession.js
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: String,
  price: Number,
  owner_id: String,
  rent_multiplier: { type: Number, default: 1 },
});

const gameSessionSchema = new mongoose.Schema({
  players: [{ user_id: String, position: Number, properties: [propertySchema] }],
  board: [String], // Имена клеток
  current_turn: Number,
  status: { type: String, default: 'active' }, // active, finished
});

module.exports = mongoose.model('GameSession', gameSessionSchema);