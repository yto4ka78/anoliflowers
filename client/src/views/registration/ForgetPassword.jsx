import React, { useState } from "react";
import styles from "./ForgetPassword.module.scss";
import axios from "axios";
import api from "../../utils/api";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [status, setStatus] = useState(false);

  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login/forgetPassword", {
        email: email,
      });
      setMessage(response.data.message);
      setStatus(response.data.status);
      setShowMessage(true);
    } catch (error) {}
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
    setTimeout(() => {
      setShowMessage(false);
      setMessage("");
    }, 6000);
  };
  return (
    <div className={styles.passwordContainer}>
      <h1>Забыли пароль?</h1>
      <h3>
        Укажите свой email, под которым вы зарегистрированы на сайте и на него
        будет отправлена информация о восстановлении пароля.
      </h3>
      {showMessage ? (
        <div className={styles.notificationMessage}> ⚠️ {message} </div>
      ) : (
        ""
      )}
      {/* <div
        className={`${styles.notificationMessage} ${
          showMessage ? styles.visible : styles.hidden
        }`}
      >
        ⚠️ {message}
      </div> */}
      <form className={styles.loginForm} onSubmit={handleLoginSubmit}>
        <label className={styles.label} htmlFor="logEmail">
          Email
        </label>
        <input
          type="email"
          id="logEmail"
          name="logEmail"
          value={email}
          className={styles.input}
          onChange={(e) => handleSetEmail(e)}
        />

        {status ? (
          <div className={styles.password_sended}> ✅ Проверьте почту </div>
        ) : (
          <button type="submit" className={styles.submitButton}>
            ОТПРАВИТЬ
          </button>
        )}
      </form>
    </div>
  );
};
export default ForgetPassword;
