const express = require("express");
const router = express.Router();
const BasketController = require("../controllers/basketController");

router.post("/getproduct", BasketController.getproduct);
router.post("/senBasketInfo", BasketController.senBasketInfo);

module.exports = router;
