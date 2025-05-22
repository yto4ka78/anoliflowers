// import { isPending } from "@reduxjs/toolkit";
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

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
let lastRequest = Promise.resolve();
let isPending = false;

const rateLimitedRequest = async (method, ...args) => {
  if (isPending) return; // запрет повторного вызова
  isPending = true;

  try {
    await sleep(500); // если нужен искусственный интервал
    return await method(...args);
  } catch (err) {
    throw err;
  } finally {
    isPending = false;
  }
};

// === Оборачиваем все методы ===
const wrappedApi = {
  get: (...args) => rateLimitedRequest(api.get, ...args),
  post: (...args) => rateLimitedRequest(api.post, ...args),
  put: (...args) => rateLimitedRequest(api.put, ...args),
  delete: (...args) => rateLimitedRequest(api.delete, ...args),
  patch: (...args) => rateLimitedRequest(api.patch, ...args),
  request: (...args) => rateLimitedRequest(api.request, ...args),
  // Оригинальный axios, если нужно без ограничений
  raw: api,
};

export default wrappedApi;
