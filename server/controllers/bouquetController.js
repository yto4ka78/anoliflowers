const db = require("../models/");
const Bouquet = db.Bouquet;
const Category = db.Category;
const { showError } = require("../middleware/errorTracker");
const { extractPublicId } = require("../middleware/cloudinary");
const cloudinary = require("../config/cloudinaryConfig");
const {
  autoCleanupUploadIfLimitExceeded,
} = require("../middleware/uploadUtil");

class BouquetController {
  static async createBouquet(req, res) {
    try {
      const { name, description, price } = req.body;
      const imageUrl = Array.isArray(req.files)
        ? req.files.map((file) => file.path)
        : [];

      let category = req.body.categories;
      const bouquet = new Bouquet({
        name,
        description,
        price,
        imageUrl,
      });

      await bouquet.save();
      if (category && category.length > 0) {
        await bouquet.setCategories(category);
      }
      res.status(201).json({
        message: "Букет добавлен успешно",
      });
    } catch (error) {
      showError(error);
      res.status(500).json({ error: "Ошибка при добавлении букета" });
    }
  }

  static async getAllBouquets(req, res) {
    try {
      const bouquets = await Bouquet.findAll({
        include: {
          model: Category,
          through: { attributes: [] },
        },
      });
      res.status(200).json({ bouquets });
    } catch (error) {
      showError(error);
    }
  }

  static async modifyBouquet(req, res) {
    try {
      const bouquet = await Bouquet.findByPk(req.body.bouquetId);
      if (!bouquet) {
        return res.status(404).json({ message: "Букет не найден" });
      }
      const { name, description, price, photoToDeleted, categories } = req.body;
      const exceeded = await autoCleanupUploadIfLimitExceeded({
        uploadedFiles: req.files,
        currentCount: bouquet.imageUrl?.length || 0,
        imagesToDeleteCount: Array.isArray(photoToDeleted)
          ? photoToDeleted.length
          : 0,
        res,
      });

      if (exceeded) return;
      //Удаление изображений из бд
      if (Array.isArray(photoToDeleted)) {
        bouquet.imageUrl = bouquet.imageUrl.filter(
          (url) => !photoToDeleted.includes(url)
        );
      }
      //Удаление из облака
      if (Array.isArray(photoToDeleted) && photoToDeleted.length > 0) {
        const deletePromises = photoToDeleted.map(async (url) => {
          try {
            const publicId = extractPublicId(url);
            await cloudinary.uploader.destroy(publicId);
          } catch (error) {
            console.error(`Ошибка при удалении в контроллере ${url}:`, error);
          }
        });
        await Promise.all(deletePromises);
      }
      const newImageUrl = req.files.map((file) => file.path);

      bouquet.name = name;
      bouquet.imageUrl = [...bouquet.imageUrl, ...newImageUrl];
      bouquet.description = description;
      bouquet.price = price;
      await bouquet.save();
      if (categories) {
        await bouquet.setCategories(categories);
      }
      res.status(201).json({
        message: "Букет сохранен",
      });
    } catch (error) {
      showError(error);
    }
  }

  static async handleDelete(req, res) {
    try {
      const bouquet = await Bouquet.findByPk(req.params.id);
      if (!bouquet) {
        res.status(404).json({ message: "Букет не найден" });
      }

      if (bouquet.imageUrl && Array.isArray(bouquet.imageUrl)) {
        const deletePromises = bouquet.imageUrl.map((fullUrl) => {
          const publicId = extractPublicId(fullUrl);
          if (publicId) {
            return cloudinary.uploader.destroy(publicId);
          }
        });
        await Promise.all(deletePromises);
      }
      await bouquet.destroy();
      res.status(200).json({ message: "Букет удален" });
    } catch (error) {
      res.status(500).json({ message: "Ошибка удаления букета" });
      showError(error);
    }
  }
}

module.exports = BouquetController;
