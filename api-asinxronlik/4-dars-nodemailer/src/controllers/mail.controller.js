const { sendWithLogging } = require('../services/mail.service');

async function sendMail(req, res) {
  try {
    const { to, subject, text, html } = req.body;

    // 1️⃣ subject bo‘sh bo‘lmasin
    if (!subject) {
      return res.status(400).json({ message: 'Subject is required' });
    }

    // 2️⃣ text yoki html dan kamida bittasi bo‘lsin
    if (!text && !html) {
      return res
        .status(400)
        .json({ message: 'Text or HTML is required' });
    }

    const result = await sendWithLogging(to, subject, text, html);

    res.json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error(error);

    // 3️⃣ Gmail auth xatosi
    if (error.responseCode === 535) {
      return res.status(500).json({
        message: 'Gmail authentication failed',
      });
    }

    res.status(500).json({
      message: 'Internal server error',
    });
  }
}

module.exports = {
  sendMail,
};
