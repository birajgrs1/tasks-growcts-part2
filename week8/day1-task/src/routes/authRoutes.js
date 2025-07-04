import express from 'express';
import { register, login, logout, verifyOtp } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login', user: req.session.user });  
});

router.get('/register', (req, res) => {
  res.render('register', { title: 'Register',user: req.session.user });  
});


router.post('/login', login);
router.get('/logout', logout);

router.get('/verify-otp', (req, res) => {
  res.render('verify-otp', { title: 'Verify OTP' });
});

router.post('/verify-otp', verifyOtp);


export default router;
