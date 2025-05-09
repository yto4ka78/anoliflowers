const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storageCategory } = require("../middleware/cloudinary");
const upload = multer({ storage: storageCategory });
const dashboardController = require("../controllers/dashboardController");
const authenticate = require("../middleware/authMiddleware");

router.post(
  "/createCategory",
  authenticate(["root"]),
  upload.array("photo", 1),
  dashboardController.createCategory
);
router.post(
  "/getAllCategories",
  authenticate(["root"]),
  dashboardController.getAllCategories
);

router.delete(
  "/deleteCategory/:categoryId",
  authenticate(["root"]),
  dashboardController.deleteCategory
);

router.patch(
  "/addCategoryInMenu",
  authenticate(["root"]),
  dashboardController.addCategoryInMenu
);

router.patch(
  "/addPopularCategory",
  authenticate(["root"]),
  dashboardController.addPopularCategory
);

router.patch(
  "/addAfterPopularCategory",
  authenticate(["root"]),
  dashboardController.addAfterPopularCategory
);

router.patch(
  "/deleteCategoryFromMenu",
  authenticate(["root"]),
  dashboardController.deleteCategoryFromMenu
);

router.post(
  "/modifyCategory",
  authenticate(["root"]),
  upload.array("photo", 1),
  dashboardController.modifyCategory
);
module.exports = router;
