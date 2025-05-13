const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");
const authenticate = require("../middleware/authMiddleware");

router.post(
  "/creatOrder",
  authenticate(["user", "root", "admin"]),
  OrderController.creatOrder
);

router.post(
  "/getOrdersRoot",
  authenticate(["root", "admin"]),
  OrderController.getOrdersRoot
);

router.post(
  "/confirmorder",
  authenticate(["root", "admin"]),
  OrderController.confirmOrder
);

router.post(
  "/deleteorder",
  authenticate(["root", "admin"]),
  OrderController.deleteOrder
);

router.get(
  "/getordersuser",
  authenticate(["user", "admin", "root"]),
  OrderController.getOrdersUser
);

module.exports = router;
