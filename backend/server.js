// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const ratingRoutes = require('./routes/rating'); // ✅ Импортируем роут рейтинга
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Роуты
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/rating', ratingRoutes); // ✅ Подключаем роут рейтинга

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});