import React, { useState } from "react";
import styles from "./Login.module.scss";
import axios from "axios";
const Login = () => {
  //For login
  const [logFormData, setLogFormData] = useState({
    logEmail: "",
    logPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLogFormData({ ...logFormData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("logEmail", logFormData.logEmail);
    data.append("logPassword", logFormData.logPassword);
    try {
      const response = await axios.post("api/login/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      window.location.href = "/";
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <div className={styles.LoginContainer}>
      <h1>Вход</h1>
      <form className={styles.loginForm}>
        <label className={styles.label} htmlFor="username">
          Имя пользователя или Email *
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className={styles.input}
        />

        <label className={styles.label} htmlFor="password">
          Пароль *
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className={styles.input}
        />

        <div className={styles.checkboxContainer}>
          <label className={styles.custom_checkbox}>
            <input type="checkbox" defaultChecked />
            <span className={styles.checkmark}></span>
            Запомнить меня
          </label>
        </div>

        <button type="submit" className={styles.submitButton}>
          ВОЙТИ
        </button>
      </form>

      <div className={styles.links}>
        <a href="">Забыл свой пароль?</a>
        <a href="/registration">Регистрация</a>
      </div>
    </div>
  );
};

export default Login;
