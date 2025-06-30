const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');

router.get('/login', (req, res) => res.render('login', { title: 'Login' }));
router.get('/register', (req, res) => res.render('register', { title: 'Register' }));
router.get('/forgot', (req, res) => res.render('forgot', { title: 'Forgot Password' }));

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot', authController.forgotPassword);

router.get('/reset/:token', authController.renderResetForm);
router.post('/reset/:token', authController.resetPassword);

router.get('/dashboard', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.render('dashboard', {
    title: 'Dashboard',
    user: req.session.user
  });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

module.exports = router;
