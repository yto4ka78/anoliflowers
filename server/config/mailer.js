const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
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
