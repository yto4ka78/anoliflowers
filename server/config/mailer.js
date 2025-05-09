const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASS,
  },
});

module.exports = async function sendEmail({ to, subject, html }) {
  await transporter.sendMail({
    from: process.env.MAILER_NAME,
    to,
    subject,
    html,
  });
};
