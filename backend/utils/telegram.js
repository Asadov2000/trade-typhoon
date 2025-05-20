const crypto = require('crypto');

const verifyTelegramData = (req, res, next) => {
  const { hash, ...data } = req.body;
  const secretKey = crypto.createHmac('sha256', 'WebAppData').update(process.env.BOT_TOKEN).digest();
  const dataCheckString = Object.keys(data).sort().map(k => `${k}=${data[k]}`).join('\n');
  const hmac = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

  if (hmac === hash) {
    req.telegramUser = data;
    next();
  } else {
    res.status(401).json({ error: 'Неверные данные Telegram' });
  }
};

module.exports = verifyTelegramData;