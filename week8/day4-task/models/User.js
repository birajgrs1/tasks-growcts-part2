const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: String,
  resetToken: String,
  resetExpires: Date,
});

userSchema.methods.hashPassword = async function (pw) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pw, salt);
};

userSchema.methods.comparePassword = async function (pw) {
  return await bcrypt.compare(pw, this.password);
};

userSchema.methods.createPasswordReset = function () {
  this.resetToken = crypto.randomBytes(20).toString('hex');
  this.resetExpires = Date.now() + 3600000;
};

module.exports = mongoose.model('User', userSchema);