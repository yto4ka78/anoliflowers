import { jwtDecode } from "jwt-decode";

export const getUserFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const decoded = jwtDecode(token); // Декодируем токен
        return decoded.name || decoded.email || "Пользователь"; // Вернём имя, email или дефолтное значение
    } catch (error) {
        console.error("Ошибка при декодировании токена:", error);
        return null;
    }
};

export default getUserFromToken;
