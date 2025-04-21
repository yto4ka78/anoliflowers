const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registrationController");
const authenticate = require("../middleware/authMiddleware");

// router.post(
//   "/registration",
//   authenticate(["root"]),
//   registrationController.register
// );

// module.exports = router;
