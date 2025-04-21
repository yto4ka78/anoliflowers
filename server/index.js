require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { connectDB, sequelize, syncBD } = require("./config/db");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

connectDB();
syncBD();
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: "Слишком много запросов с этого IP, попробуйте позже.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(
  cors({
    origin: process.env.API_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(xss());

app.use("/api", apiLimiter);
const apiRoutes = require("./routes");
app.use("/api", apiRoutes);

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Server is running");
});
