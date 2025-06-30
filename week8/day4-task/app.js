const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);
const app = express();

app.set('view engine', 'ejs');

app.use(expressLayouts);

app.set('layout', 'layout');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

app.use((req, res, next) => {
  res.locals.messages = req.flash();
  res.locals.user = req.session.user;
  next();
});

app.use(require('./routes/authRoutes'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
