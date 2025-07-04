// config/db.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // отключает SQL-логи
    pool: {
      max: 5, // максимум одновременных соединений
      min: 0,
      acquire: 20000, // максимум 30 сек ждать соединение
      idle: 10000, // закрывать "пустые" соединения через 10 сек
    },
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected...");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};

const syncBD = async () => {
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("All models were synchronized successfully.");
    })
    .catch((error) => {
      console.error("Error synchronizing models:", error.message);
    });
};

module.exports = { sequelize, connectDB, syncBD };
