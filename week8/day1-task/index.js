import express from 'express';
import session from 'express-session';
import authRoutes from './src/routes/authRoutes.js';
import employeeRoutes from './src/routes/employeeRoutes.js';
import auditRoutes from './src/routes/auditRoutes.js';
import connectDB from './src/config/db.js';
import dotenv from 'dotenv';

const secret = process.env.JWT_SECRET;

dotenv.config();
connectDB();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/', authRoutes);
app.use('/employees', employeeRoutes);
app.use('/audit', auditRoutes);

app.get('/', (req, res) => res.redirect('/login'));

app.get('/dashboard', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.render('dashboard', {title: 'Dashboard', user: req.session.user });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

