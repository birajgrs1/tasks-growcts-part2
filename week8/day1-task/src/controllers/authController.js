import bcrypt from "bcrypt";
import User from "../models/User.js";
import LoginLog from "../models/LoginLog.js";
import { sendPhoneOTP, verifyPhoneOTP } from "../services/otpService.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role, department, phone } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.send("Email already registered");

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashed,
      role,
      department,
      phone,
    });

    res.redirect("/login");
  } catch (err) {
    res.status(500).send("Registration failed");
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.send("Invalid credentials");
  }

  await sendPhoneOTP(user.phone);

  req.session.tempUser = {
    _id: user._id,
    name: user.name,
    role: user.role,
    department: user.department,
    phone: user.phone
  };

  res.redirect('/verify-otp');
};

export const verifyOtp = async (req, res) => {
  const { code } = req.body;
  const tempUser = req.session.tempUser;

  if (!tempUser) return res.redirect('/login');

  const valid = await verifyPhoneOTP(tempUser.phone, code);
  if (!valid) return res.send("Invalid or expired OTP");

  req.session.user = tempUser;
  delete req.session.tempUser;

  await LoginLog.create({
    userId: tempUser._id,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });

  await AuditLog.create({
    actor: tempUser._id,
    action: '2fa_login',
    target: tempUser._id,
    ip: req.ip,
    endpoint: req.originalUrl,
    dataBefore: null,
    dataAfter: null
  });

  res.redirect('/dashboard');
};


export const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};
