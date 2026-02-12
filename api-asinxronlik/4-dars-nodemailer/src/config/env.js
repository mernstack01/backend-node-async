require('dotenv').config();
const requireEnv = require('../utils/requireEnv');

const PORT = process.env.PORT || 3000;

const GMAIL_USER = requireEnv('GMAIL_USER');
const GMAIL_PASS = requireEnv('GMAIL_PASS');
const MAIL_FROM = requireEnv('MAIL_FROM');

module.exports = {
  PORT,
  GMAIL_USER,
  GMAIL_PASS,
  MAIL_FROM,
};
