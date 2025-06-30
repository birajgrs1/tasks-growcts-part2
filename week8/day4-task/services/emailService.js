const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendEmail(to, subject, tpl, data) {
  const html = await ejs.renderFile(path.join(__dirname, '../views/emails', tpl + '.ejs'), data);
  await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, html });
}

module.exports = { sendEmail };