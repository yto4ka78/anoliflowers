const express = require("express");
const db = require("../models");
const { showError } = require("../middleware/errorTracker");

const Bouquet = db.Bouquet;
const Category = db.Category;
const { sequelize } = require("../config/db");
class MainController {
  static async getMenu(req, res) {
    try {
      const categories = await Category.findAll({
        where: { showInMenu: 1 },
        include: {
          model: Bouquet,
          through: { attributes: [] },
        },
      });

      res.status(200).json({ categories: categories });
    } catch (error) {
      res.status(500).json({ message: "Категории не найдены" });
      showError(error);
    }
  }

  static async getMainData(req, res) {
    try {
      const response = await Bouquet.findAll();
      res.json(response);
    } catch (err) {
      showError(err);
    }
  }

  static async getAllCategories(req, res) {
    try {
      const allCategories = await Category.findAll();
      const allBouquets = await Bouquet.findAll();
      res.status(200).json({ allCategories, allBouquets });
    } catch (error) {
      showError(error);
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }

  static async getBouquets(req, res) {
    try {
      const categoryId = req.params.id;

      const category = await Category.findByPk(categoryId, {
        include: {
          model: Bouquet,
          through: { attributes: [] },
        },
      });
      if (!category) {
        return res.status(404).json({ message: "Букеты не найдены" });
      }
      res.status(200).json({ category: category });
    } catch (error) {
      showError(error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }

  static async getProduct(req, res) {
    try {
      const bouquetId = req.params.id;
      const bouquet = await Bouquet.findByPk(bouquetId);
      if (!bouquet) {
        return res.status(404).json({
          message:
            "Букет не найден, возможно из-за неполадок на сайте, обратитесь к менеджеру если у вас возникли вопросы",
          id: bouquetId,
        });
      }
      res.status(200).json({ bouquet: bouquet });
    } catch (error) {
      showError(error);
      res.status(500).json({
        message:
          "Ошибка сервера, возможно из-за неполадок на сайте, обратитесь к менеджеру если у вас возникли вопросы",
      });
    }
  }

  static async getCategoriesForMapSite(req, res) {
    try {
      const categories = await Category.findAll();
      res.json({ categories: categories });
    } catch (err) {
      showError(err);
    }
  }
}

module.exports = MainController;
