require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const capRoutes = require('./routes/capRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/', capRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
