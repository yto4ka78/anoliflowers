const { showError } = require("../middleware/errorTracker");

// controllers/BouquetController.js
class BouquetController {
  static async testFunction() {
    try {
      throw new Error("Тестовая ошибка для проверки catch-блока");
      console.log("Тестовая функция сработала!");
    } catch (error) {
      showError(error);
    }
  }
}
BouquetController.testFunction().then(console.log);

module.exports = BouquetController;
