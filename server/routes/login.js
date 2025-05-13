const express = require("express");
const router = express.Router();
const LoginController = require("../controllers/loginController");
const authenticate = require("../middleware/authMiddleware");

router.post("/login", LoginController.autorization);
router.post(
  "/changeProfileInfo",
  authenticate(["user", "admin", "root"]),
  LoginController.changeProfileInfo
);

router.post(
  "/getUserData",
  authenticate(["user", "admin", "root"]),
  LoginController.getUserData
);

router.post(
  "/verifyEmail",
  authenticate(["user", "admin", "root"]),
  LoginController.verifyEmail
);

router.post("/forgetPassword", LoginController.forgetPassword);
router.post("/resetPassword", LoginController.resetPassword);

module.exports = router;
