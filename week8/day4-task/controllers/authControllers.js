const User = require('../models/User');
const { sendEmail } = require('../services/emailService');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    req.flash('error', 'All fields required');
    return res.redirect('/register');
  }

  try {
    const user = new User({ email });
    user.password = await user.hashPassword(password);
    await user.save();
    req.flash('success', 'Registered! Please log in.');
    res.redirect('/login');
  } catch (e) {
    req.flash('error', 'Email already used');
    res.redirect('/register');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    req.flash('error', 'Invalid credentials');
    return res.redirect('/login');
  }

  req.session.user = { id: user._id, email: user.email };
  req.flash('success', 'Welcome back!');
  res.redirect('/dashboard');
};

exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    req.flash('error', 'Email not found');
    return res.redirect('/forgot');
  }

  user.createPasswordReset();
  await user.save();
  await sendEmail(user.email, 'Password Reset', 'reset-password', {
    user,
    resetUrl: `${process.env.BASE_URL}/reset/${user.resetToken}`
  });

  req.flash('info', 'Password reset link sent');
  res.redirect('/login');
};

exports.renderResetForm = async (req, res) => {
  const user = await User.findOne({
    resetToken: req.params.token,
    resetExpires: { $gt: Date.now() }
  });

  if (!user) return res.send('Invalid or expired token');

  res.render('reset', { token: req.params.token, title: 'Reset Password' });
};

exports.resetPassword = async (req, res) => {
  const user = await User.findOne({
    resetToken: req.params.token,
    resetExpires: { $gt: Date.now() }
  });

  if (!user) {
    req.flash('error', 'Invalid or expired token');
    return res.redirect('/forgot');
  }

  user.password = await user.hashPassword(req.body.password);
  user.resetToken = undefined;
  user.resetExpires = undefined;
  await user.save();

  req.flash('success', 'Password has been reset');
  res.redirect('/login');
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
};