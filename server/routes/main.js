const express = require("express");
const router = express.Router();
const MainController = require("../controllers/mainController");

router.get("/", MainController.getMainData);
router.get("/allCategories", MainController.getAllCategories);
router.get("/getBouquets/:id", MainController.getBouquets);
router.get("/getMenu", MainController.getMenu);
router.get("/getProduct/:id", MainController.getProduct);
router.get("/mapSite", MainController.getCategoriesForMapSite);

module.exports = router;
