import axios from "axios";
import { jwtDecode } from "jwt-decode";
const apiUrl = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (e) {
    return true;
  }
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    if (isTokenExpired(token)) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return Promise.reject(new Error("Token expired"));
    }
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
