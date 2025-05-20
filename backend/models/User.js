const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  telegram_id: { type: String, unique: true, required: true },
  username: String,
  first_name: String,
  last_name: String,
  avatar: String,
  ton_wallet: String,
  balance: { type: Number, default: 0 },
  custom_token_balance: { type: Number, default: 0 },
  experience: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  inventory: [{ nft_address: String, name: String, image: String }],
  friends: [{ telegram_id: String, joined_at: Date }],
  last_rating_update: Date,
});

module.exports = mongoose.model('User', userSchema);