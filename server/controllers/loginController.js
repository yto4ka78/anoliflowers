const db = require("../models");
const User = db.User;
require("dotenv").config();
const { showError } = require("../middleware/errorTracker");
const EMAIL_SECRET = process.env.MAILER_JWT;
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../config/mailer");

class LoginController {
  static async autorization(req, res) {
    try {
      const { logEmail, logPassword } = req.body;
      if (!JWT_SECRET) {
        throw new Error("JWT_SECRET не установлен в переменных окружения");
      }
      const user = await User.findOne({ where: { email: logEmail } });
      if (!user) {
        return res.status(404).json({ message: "Email или пароль неверный" });
      }
      const isMatch = await bcrypt.compare(logPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Email или пароль неверный" });
      }
      if (!user.isVerified) {
        return res
          .status(403)
          .json({ message: "Подтвердите email перед входом" });
      }
      const token = jwt.sign(
        { userId: user.id, email: user.email, roles: user.roles },
        JWT_SECRET,
        { expiresIn: "24h" }
      );
      res.json({ token });
    } catch (error) {
      showError(error);
    }
  }

  static async getUserData(req, res) {
    try {
      const userId = req.user.userId;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }
      res.status(200).json({
        user: {
          name: user.name,
          surname: user.surname,
          familyname: user.familyname,
          email: user.email,
        },
      });
    } catch (error) {
      showError(error);
    }
  }

  static async changeProfileInfo(req, res) {
    try {
      const {
        name,
        surname,
        familyname,
        email,
        oldPassword,
        newPassword,
        repeatPassword,
      } = req.body;
      const userId = req.user.userId;
      const user = await User.findByPk(userId);
      let emailHasBeenChanged = false;
      if (oldPassword) {
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
          return res
            .status(400)
            .json({ message: "Старый пароль введен неверно" });
        }
        if (newPassword !== repeatPassword) {
          return res.status(400).json({
            message: "Новый пароль введен неверно второй раз",
          });
        } else {
          user.password = await bcrypt.hash(newPassword, 10);
        }
      }

      if (email) {
        if (user.email !== email) {
          const existingUser = await User.findOne({ where: { email } });
          if (existingUser && existingUser.id !== user.id) {
            return res.status(400).json({
              message: "Этот email уже используется другим пользователем",
            });
          }

          const emailToken = jwt.sign({ email }, EMAIL_SECRET, {
            expiresIn: "60m",
          });
          const url = `http://localhost:5000/email-changed?token=${emailToken}`;
          await sendEmail({
            to: email,
            subject: "Обновление почты",
            html: `<p>Нажмите по ссылке, чтобы обновить ваш email:</p><a href="${url}">${url}</a>`,
          });
          emailHasBeenChanged = true;
        }
      } else {
      }
      if (familyname) {
        if (user.familyname !== familyname) {
          user.familyname = familyname;
        }
      }
      if (name) {
        if (user.name !== name) {
          user.name = name;
        }
      }
      if (surname) {
        if (user.surname !== surname) {
          user.surname = surname;
        }
      }
      await user.save();
      if (emailHasBeenChanged) {
        res.status(200).json({
          message: "Данные обновлены, подтвердите новый почтовый адрес",
        });
      } else {
        res.status(200).json({ message: "Данные обновлены" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Ошибка обновления формы", action: true });
      showError(error);
    }
  }

  static async verifyEmail(req, res) {
    try {
      const { token } = req.query;
      const decoded = jwt.verify(token, EMAIL_SECRET);
      const userId = req.user.userId;
      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }
      const newEmail = decoded.email;
      user.email = newEmail;
      await user.save();
      res.status(200).json({ message: "Email обновлен" });
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Недействительный или просроченный токен" });
    }
  }

  static async forgetPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }
      const token = jwt.sign({ userId: user.id }, EMAIL_SECRET, {
        expiresIn: "1h",
      });
      const resetUrl = `http://localhost:5000/reset_password?token=${token}`;

      await sendEmail({
        to: email,
        subject: "Сброс пароля",
        html: `<p>Нажмите по ссылке, чтобы изменить пароль:</p><a href="${resetUrl}">${resetUrl}</a>`,
      });

      return res.json({
        message: "Ссылка отправлена на email",
        status: "success",
      });
    } catch (err) {
      showError(err);
      return res.status(400).json({ message: "Ошибка отправки пароля" });
    }
  }

  static async resetPassword(req, res) {
    const { token, newPassword } = req.body;
    try {
      const decoded = jwt.verify(token, EMAIL_SECRET);
      const user = await User.findByPk(decoded.userId);
      if (!user)
        return res.status(400).json({ message: "Пользователь не найден" });

      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();

      return res.json({ message: "Пароль успешно обновлён" });
    } catch (e) {
      return res.status(400).json({ message: "Неверный или истекший токен" });
    }
  }
}

module.exports = LoginController;
