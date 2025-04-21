const db = require("../models/");
const Category = db.Category;
const { showError } = require("../middleware/errorTracker");
const { Op } = require("sequelize");
const {
  autoCleanupUploadIfLimitExceeded,
} = require("../middleware/uploadUtil");
const { extractPublicId } = require("../middleware/cloudinary");
const cloudinary = require("../config/cloudinaryConfig");

class DashboardController {
  static async createCategory(req, res) {
    try {
      const { name: nameCategory } = req.body;
      const imagesUrl = req.files.map((file) => file.path);

      const exceeded = await autoCleanupUploadIfLimitExceeded({
        uploadedFiles: req.files,
        limit: 1,
        res,
      });
      if (exceeded) return;

      const category = await Category.create({
        Name: nameCategory,
        imageUrl: imagesUrl,
      });
      await category.save();
      res.status(201).json({
        message: "Категория добавлен успешно",
      });
    } catch (error) {
      res.status(500).json({ error });
      showError(error);
    }
  }

  static async getAllCategories(req, res) {
    try {
      const categories = await Category.findAll();

      res.status(200).json({
        message: "Категория добавлен успешно",
        categories: categories,
      });
    } catch (error) {
      showError(error);
      res.status(500).json({ error });
    }
  }

  static async deleteCategory(req, res) {
    try {
      const id = req.params.categoryId;
      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ message: "Категория не найдена" });
      }

      if (category.imageUrl && Array.isArray(category.imageUrl)) {
        const deletePromises = category.imageUrl.map((fullUrl) => {
          const publicId = extractPublicId(fullUrl);
          if (publicId) {
            return cloudinary.uploader.destroy(publicId);
          }
        });

        await Promise.all(deletePromises);
      }

      await category.destroy();

      res.status(200).json({ message: "Категория удалена" });
    } catch (error) {
      showError(error);
      res.status(500).json({ error: "Ошибка удаления" });
    }
  }

  static async modifyNavBar(req, res) {
    try {
      // 1. Защита: проверяем, что пришёл массив
      const rawCategories = Array.isArray(req.body.categories)
        ? req.body.categories
        : [];

      // 2. Преобразуем в числа, убираем пустые, дубликаты и некорректные значения
      const categories = Array.from(
        new Set(
          rawCategories.map((id) => parseInt(id, 10)).filter((id) => !isNaN(id)) // исключаем нечисла
        )
      );

      // 3. Проверка лимита
      if (categories.length === 0 || categories.length > 3) {
        return res.status(400).json({
          message: "Выберите от 1 до 3 категорий",
        });
      }

      // 4. Обновляем категории
      await Category.update(
        { showInNavbar: true },
        {
          where: {
            id: {
              [Op.in]: categories,
            },
          },
        }
      );

      await Category.update(
        { showInNavbar: false },
        {
          where: {
            id: {
              [Op.notIn]: categories,
            },
          },
        }
      );

      return res.status(200).json({ message: "Категории обновлены успешно" });
    } catch (error) {
      showError(error);
    }
  }

  static async modifyCategory(req, res) {
    try {
      const category = await Category.findByPk(req.body.id);
      if (!category) {
        return res.status(404).json({ message: "Категория не найдена" });
      }

      //Проверка количества фото
      let photoToDeleted = req.body.photoToDeleted;
      if (!photoToDeleted) {
        photoToDeleted = [];
      } else if (!Array.isArray(photoToDeleted)) {
        photoToDeleted = [photoToDeleted]; // оборачиваем одну строку в массив
      }
      const exceeded = await autoCleanupUploadIfLimitExceeded({
        uploadedFiles: req.files,
        currentCount: category.imageUrl?.length || 0,
        imagesToDeleteCount: Array.isArray(photoToDeleted)
          ? photoToDeleted.length
          : 0,
        limit: 1,
        res,
      });
      if (exceeded) return;
      //Удаление с БД
      if (Array.isArray(photoToDeleted)) {
        category.imageUrl = category.imageUrl.filter(
          (url) => !photoToDeleted.includes(url)
        );
      }

      if (Array.isArray(photoToDeleted) && photoToDeleted.length > 0) {
        const deletePromises = photoToDeleted.map(async (url) => {
          try {
            const publicId = extractPublicId(url);
            await cloudinary.uploader.destroy(publicId);
          } catch (error) {
            console.error(`Ошибка при удалении ${url}:`, error);
          }
        });
        await Promise.all(deletePromises);
      }
      const newImageUrl = req.files.map((file) => file.path);
      category.Name = req.body.name;
      category.imageUrl = [...category.imageUrl, ...newImageUrl];
      await category.save();
      res.status(200).json({
        message: "Категория сохранена",
        category: category,
      });
    } catch (error) {
      showError(error);
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }
}

module.exports = DashboardController;
