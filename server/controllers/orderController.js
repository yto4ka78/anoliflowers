const express = require("express");
const db = require("../models/");
const Orderdetails = db.Orderdetails;
const User = db.User;
const { showError } = require("../middleware/errorTracker");
const botToken = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

class OrderController {
  static async creatOrder(req, res) {
    try {
      const userId = req.user.userId;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }
      const {
        senderName,
        senderPhone,
        recipientName,
        recipientPhone,
        bouquets,
        comment,
        address,
      } = req.body.formData;
      const totalSum = bouquets.reduce((sum, b) => sum + b.total, 0);
      const email = user.email;
      const senderfamilyname = user.familyname;

      const newOrder = await Orderdetails.create({
        emailuser: email,
        sendername: senderName,
        senderfamilyname: senderfamilyname,
        sendernumberphone: senderPhone,
        recipientname: recipientName,
        recipientnumberphone: recipientPhone,
        totalPrice: totalSum,
        bouquets: bouquets,
        comments: comment,
        address: address,
        userId: user.id,
      });

      return res.status(201).json({
        message: "Заказ успешно создан",
      });
    } catch (error) {
      showError(error);
    }
  }

  static async getOrdersRoot(req, res) {
    try {
      const orders = await Orderdetails.findAll();
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "Заказы не найдены" });
      }
      return res.status(200).json({ orders: orders });
    } catch (error) {
      showError(error);
    }
  }

  static async confirmOrder(req, res) {
    try {
      const id = req.body.id;
      const order = await Orderdetails.findByPk(id);
      if (!order) {
        return res.status(400).json({ message: "нет такого заказа" });
      }
      order.status = "confirmed";
      await order.save();
      return res.status(200).json({ status: "confirmed" });
    } catch (error) {
      showError(error);
    }
  }

  static async deleteOrder(req, res) {
    try {
      const id = req.body.id;
      const order = await Orderdetails.findByPk(id);
      if (!order) {
        return res.status(400).json({ message: "нет такого заказа" });
      }
      await order.destroy();

      return res.status(200).json({ status: "deleted" });
    } catch (error) {
      showError(error);
    }
  }

  static async getOrdersUser(req, res) {
    try {
      const userId = req.user.userId;
      const user = await User.findByPk(userId, {
        include: [{ model: Orderdetails, as: "orders" }],
      });
      return res.status(200).json({ orders: user.orders });
    } catch (error) {
      showError(error);
    }
  }
}
module.exports = OrderController;
