const db = require("../models/");
const { sequelize } = require("../models");
const User = db.User;
const RegistrationLog = db.RegistrationLog;
const jwt = require("jsonwebtoken");
const sendEmail = require("../config/mailer");
const EMAIL_SECRET = process.env.MAILER_JWT;

class registrationController {
  static async register(req, res) {
    const t = await sequelize.transaction();
    try {
      const { email, password } = req.body;
      const ip = req.ip;

      const today = new Date().toISOString().split("T")[0];

      const count = await RegistrationLog.count({
        where: { ip, date: today },
      });

      if (count >= 3) {
        return res.status(429).json({
          message: "Превышен лимит регистраций с одного IP за день",
          condition: false,
        });
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Email уже используется", condition: false });
      }

      const newUser = await User.create(
        { email, password, isVerified: false },
        { transaction: t }
      );

      const emailToken = jwt.sign({ email }, EMAIL_SECRET, {
        expiresIn: "60m",
      });
      const url = `http://localhost:5000/email-verified?token=${emailToken}`;

      await RegistrationLog.create({ ip, date: today }, { transaction: t });
      await t.commit();

      res.status(201).json({
        message: "Пользователь зарегистрирован. Подтвердите email через почту.",
        condition: true,
      });
      sendEmail({
        to: email,
        subject: "Подтверждение email Anoli Flowers",
        html: `<p>Нажмите по ссылке, чтобы подтвердить email:</p><a href="${url}">${url}</a>`,
      }).catch((err) => {
        console.error("Ошибка при отправке письма:", err);
      });
    } catch (err) {
      await t.rollback();
      console.error("Ошибка сервера:", err);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }

  static async verifyEmail(req, res) {
    try {
      const { token } = req.query;
      const decoded = jwt.verify(token, EMAIL_SECRET);
      const user = await User.findOne({ where: { email: decoded.email } });
      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }

      user.isVerified = true;
      await user.save();
      res.status(200).json({ message: "Email подтвержден" });
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Недействительный или просроченный токен" });
    }
  }
}

module.exports = registrationController;
