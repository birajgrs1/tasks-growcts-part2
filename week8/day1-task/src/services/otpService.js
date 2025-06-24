import OTP from '../models/OTP.js';
import { sendSMS } from '../utils/sendSMS.js';

export const sendPhoneOTP = async (phone) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  await OTP.deleteMany({ phone }); 
  await OTP.create({ phone, code });

  await sendSMS(phone, `Your verification code is: ${code}`);
};

export const verifyPhoneOTP = async (phone, code) => {
  const otp = await OTP.findOne({ phone, code });
  return !!otp;
};
