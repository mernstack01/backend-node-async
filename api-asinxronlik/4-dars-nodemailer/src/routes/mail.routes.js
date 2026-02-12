const express = require('express');
const { sendMail } = require('../controllers/mail.controller');

const router = express.Router();

router.post('/send', sendMail);

module.exports = router;
