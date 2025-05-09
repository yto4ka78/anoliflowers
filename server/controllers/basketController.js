const express = require("express");
const db = require("../models/");
const Bouquet = db.Bouquet;
const { showError } = require("../middleware/errorTracker");
const botToken = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

class BasketController {
  static async getproduct(req, res) {
    try {
      const { ids } = req.body;

      if (!ids || !Array.isArray(ids)) {
        return res.status(400).json({ message: "Некорректный список ID" });
      }

      const bouquets = await Bouquet.findAll({
        where: { id: ids },
      });

      res.status(200).json({ bouquets: bouquets });
    } catch (error) {
      res.status(500).json({ message: "Букеты не найдены" });
      showError(error);
    }
  }
  static async senBasketInfo(req, res) {
    const { text } = req.body;
    const TELEGRAM_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "HTML",
        }),
      });

      res.status(200).send("Message sent");
    } catch (error) {
      showError(error);
    }
  }
}
module.exports = BasketController;
