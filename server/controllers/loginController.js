const db = require("../models");
const User = db.User;
require("dotenv").config();
const { showError } = require("../middleware/errorTracker");

const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class LoginController {
  static async autorization(req, res) {
    try {
      const { logEmail, logPassword } = req.body;
      if (!JWT_SECRET) {
        throw new Error("JWT_SECRET не установлен в переменных окружения");
      }
      const user = await User.findOne({ where: { email: logEmail } });
      if (!user) {
        return res
          .status(404)
          .json({ message: "Пользователь или пароль неверный" });
      }
      const isMatch = await bcrypt.compare(logPassword, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Пользователь или пароль неверный" });
      }
      const token = jwt.sign(
        { userId: user.id, email: user.email, roles: user.roles },
        JWT_SECRET,
        { expiresIn: "24h" }
      );
      res.json({ token });
    } catch (err) {
      showError(error);
    }
  }

  // static async changeEmail(req, res) {
  //   try {
  //     const email = req.body.email;
  //     if (!email) {
  //       return res
  //         .status(400)
  //         .json({ message: "Почтовый адрес не введен ", action: true });
  //     }

  //     await user.save();
  //   } catch (error) {
  //     res.status(500).json({ message: "Ошибка обновления формы" });
  //   }
  // }

  static async changePassword(req, res) {
    try {
      const { oldPassword, newPassword, repeatPassword } = req.body;
      if (!oldPassword || !newPassword || !repeatPassword) {
        return res
          .status(400)
          .json({ message: "Заполните все поля ", action: true });
      }
      if (newPassword !== repeatPassword) {
        return res.status(400).json({
          message: "Новый пароль введен неверно второй раз",
          action: true,
        });
      }
      const userId = req.user.userId;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({
          message: "Пользователь не найден",
          action: true,
        });
      }
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Старый пароль неверен", action: true });
      }
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
      res.status(200).json({ message: "Пароль успешно изменён", action: true });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Ошибка обновления формы", action: true });
      showError(error);
    }
  }
}

module.exports = LoginController;
