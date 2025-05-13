import { jwtDecode } from "jwt-decode";

export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.name || decoded.email || "Пользователь";
  } catch (error) {
    console.error("Ошибка при декодировании токена:", error);
    return null;
  }
};

export default getUserFromToken;
