const cron = require("node-cron");
const { User } = require("../models");
const { Op } = require("sequelize");

function startCleanupJob() {
  cron.schedule("0 * * * *", async () => {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    try {
      const deleted = await User.destroy({
        where: {
          isVerified: false,
          createdAt: { [Op.lt]: oneHourAgo },
        },
      });
      console.log(`[CRON] Удалено неподтверждённых пользователей: ${deleted}`);
    } catch (err) {
      console.error("[CRON] Ошибка при очистке пользователей:", err);
    }
  });
}

module.exports = startCleanupJob;
