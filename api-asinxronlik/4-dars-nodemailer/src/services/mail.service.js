const transporter = require('../config/mailer');
const { MAIL_FROM } = require('../config/env');

async function sendWithLogging(to, subject, text, html) {
  const info = await transporter.sendMail({
    from: MAIL_FROM,
    to,
    subject,
    text,
    html,
  });

  console.log('Mail info:');
  console.log({
    messageId: info.messageId,
    accepted: info.accepted,
    rejected: info.rejected,
  });

  return {
    messageId: info.messageId,
    accepted: info.accepted,
    rejected: info.rejected,
  };
}

module.exports = {
  sendWithLogging,
};
