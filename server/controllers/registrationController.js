// const bcrypt = require("bcrypt");
// const db = require("../models/");
// const User = db.User;

// class registrationController {
//   static async register(req, res) {
//     try {
//       const { email, password } = req.body;
//       const existingUser = await User.findOne({ where: { email } });
//       if (existingUser) {
//         return res.status(400).json({ message: "Email уже используется" });
//       }
//       const newUser = await User.create({ email, password });
//       res.status(201).json({
//         message: "Пользователь успешно зарегистрирован",
//       });
//     } catch (err) {
//       console.error("Ошибка сервера:", err);
//       res.status(500).json({
//         message: "Ошибка сервера",
//       });
//     }
//   }
// }

// module.exports = registrationController;
