const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registrationController");
const authenticate = require("../middleware/authMiddleware");

router.post("/registration", registrationController.register);
router.get("/verify-email", registrationController.verifyEmail);

module.exports = router;
