const express = require("express");
const router = express.Router();
const LoginController = require("../controllers/loginController");
const authenticate = require("../middleware/authMiddleware");

router.post("/login", LoginController.autorization);
router.post(
  "/changeProfilePassword",
  authenticate(["user", "admin", "root"]),
  LoginController.changePassword
);
// router.post(
//   "/changeProfileEmail",
//   authenticate(["user", "admin", "root"]),
//   LoginController.changeEmail
// );

module.exports = router;
