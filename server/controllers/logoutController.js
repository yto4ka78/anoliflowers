const express = require("express");
const router = express.Router();

class LogoutController {
  static async logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Ошибка при удалении сессии:", err);
        return res.status(500).json({ message: "Ошибка при выходе" });
      }

      res.clearCookie("connect.sid"); // Удаляем cookie с идентификатором сессии
      res.status(200).json({ message: "Вы успешно вышли из системы" });
    });
  }
}

module.exports = LogoutController;
