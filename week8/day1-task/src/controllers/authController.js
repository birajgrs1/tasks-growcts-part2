import bcrypt from 'bcrypt';
import User from '../models/User.js';
import LoginLog from '../models/LoginLog.js';


export const register = async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.send('Email already registered');

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashed,
      role,
      department
    });

    res.redirect('/login');
  } catch (err) {
    res.status(500).send('Registration failed');
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.send('Invalid credentials');
  }

  req.session.user = {
    _id: user._id,
    name: user.name,
    role: user.role,
    department: user.department
  };

  await LoginLog.create({
    userId: user._id,
    ip: req.ip,
    userAgent: req.headers['user-agent']
  });

  res.redirect('/dashboard');
};

export const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};
