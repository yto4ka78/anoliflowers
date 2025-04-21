// config/db.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
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
}

module.exports = { sequelize, connectDB, syncBD };
