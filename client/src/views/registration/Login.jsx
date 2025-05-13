import React, { useState } from "react";
import styles from "./Login.module.scss";
import axios from "axios";
const Login = () => {
  const [logFormData, setLogFormData] = useState({
    logEmail: "",
    logPassword: "",
  });
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

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
      setMessage(error.response.data.message);
      setShowMessage(true);
    }
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
    setTimeout(() => {
      setShowMessage(false);
      setMessage("");
    }, 6000);
  };

  return (
    <div className={styles.LoginContainer}>
      <h1>Вход</h1>
      <div
        className={`${styles.notificationMessage} ${
          showMessage ? styles.visible : styles.hidden
        }`}
      >
        {message}
      </div>
      <form className={styles.loginForm} onSubmit={handleLoginSubmit}>
        <label className={styles.label} htmlFor="logEmail">
          Имя пользователя или Email *
        </label>
        <input
          type="email"
          id="logEmail"
          name="logEmail"
          className={styles.input}
          onChange={(e) => handleChangeLogin(e)}
        />

        <label className={styles.label} htmlFor="logPassword">
          Пароль *
        </label>
        <input
          type="password"
          id="logPassword"
          name="logPassword"
          className={styles.input}
          onChange={(e) => handleChangeLogin(e)}
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
        <a href="/forget_pass">Забыл свой пароль?</a>
        <a href="/registration">Регистрация</a>
      </div>
    </div>
  );
};

export default Login;
