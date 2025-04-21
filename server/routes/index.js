const express = require("express");
const router = express.Router();

const bouquetRoutes = require("./bouquet");
const registrationRoutes = require("./registration");
const login = require("./login");
const logout = require("./logout");
const main = require("./main");
const dashboard = require("./dashboard");

router.use("/bouquet", bouquetRoutes);
// router.use("/registration", registrationRoutes);
router.use("/login", login);
router.use("/logout", logout);
router.use("/main", main);
router.use("/dashboard", dashboard);

module.exports = router;
