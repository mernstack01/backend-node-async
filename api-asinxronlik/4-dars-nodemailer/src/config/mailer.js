const nodemailer = require('nodemailer');
const { GMAIL_USER, GMAIL_PASS } = require('./env');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

module.exports = transporter;
