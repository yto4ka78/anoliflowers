import { jwtDecode } from "jwt-decode";

export const userHasRole = (role) => {
    const token = localStorage.getItem("token");

    if (token) {
        try {
            const decoded = jwtDecode(token);
            return decoded.roles?.includes(role);
        } catch (error) {
            console.error("Ошибка декодирования токена:", error);
        }
    }

    return false;
};

export default userHasRole;
