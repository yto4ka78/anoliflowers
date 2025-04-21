const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = (allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Токен не предоставлен" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      const hasRole = decoded.roles.some((role) => allowedRoles.includes(role));
      if (!hasRole) {
        return res.status(403).json({ message: "Доступ запрещён" });
      }

      req.user = decoded;
      next();
    } catch (err) {
      console.error("Ошибка проверки токена методом authenticate", err.message);
      return res
        .status(401)
        .json({ message: "Недействительный токен, перезайдите в аккаунт" });
    }
  };
};

module.exports = authenticate;
