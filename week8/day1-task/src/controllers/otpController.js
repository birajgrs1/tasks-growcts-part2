import OTP from '../models/OTP.js';
import User from '../models/User.js';
import { sendSMS } from '../utils/sendSMS.js';
import crypto from 'crypto';

export const sendPhoneOTP = async (req, res) => {
  const { phone } = req.body;
  const user = await User.findOne({ phone });

  if (!user) return res.send('Phone not registered');

  const code = crypto.randomInt(100000, 999999).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await OTP.create({ userId: user._id, code, expiresAt, type: 'sms' });

  await sendSMS(phone, `Your OTP code is: ${code}`);

  req.session.tempUser = user._id;
  res.render('verifyOTP', { message: 'OTP sent via SMS.' });
};

export const verifyPhoneOTP = async (req, res) => {
  const { code } = req.body;
  const userId = req.session.tempUser;

  const otp = await OTP.findOne({ userId, code, type: 'sms', isUsed: false, expiresAt: { $gt: new Date() } });

  if (!otp) return res.render('verifyOTP', { message: 'Invalid or expired OTP' });

  otp.isUsed = true;
  await otp.save();

  req.session.user = await User.findById(userId);
  res.redirect('/dashboard');
};
