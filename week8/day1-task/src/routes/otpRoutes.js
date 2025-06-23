import express from 'express';
import { sendPhoneOTP, verifyPhoneOTP } from '../controllers/otpController.js';

const router = express.Router();

router.get('/verify', (req, res) => res.render('verifyOTP', { message: '' }));

router.post('/send-otp-phone', sendPhoneOTP);
router.post('/verify-otp-phone', verifyPhoneOTP);

export default router;
