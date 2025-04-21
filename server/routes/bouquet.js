const express = require("express");
const router = express.Router();
const bouquetController = require("../controllers/bouquetController");
const multer = require("multer");
const { storageBouquet } = require("../middleware/cloudinary");
const upload = multer({ storage: storageBouquet });
const authenticate = require("../middleware/authMiddleware");
const util = require("util");

router.post(
  "/create",
  authenticate(["root"]),
  (req, res, next) => {
    upload.array("photo", 5)(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: "Не больше 5 фотографий" });
      } else if (err) {
        console.error("Ошибка загрузки файлов мультер:", err);
        return res.status(500).json({ message: "Ошибка при загрузке файлов" });
      }
      next();
    });
  },
  bouquetController.createBouquet
);

router.post(
  "/getAllBouquets",
  authenticate(["root"]),
  bouquetController.getAllBouquets
);

router.post(
  "/modifyBouquet",
  authenticate(["root"]),
  upload.array("photo", 5),
  bouquetController.modifyBouquet
);

router.delete(
  "/handleDelete/:id",
  authenticate(["root"]),
  bouquetController.handleDelete
);

module.exports = router;
