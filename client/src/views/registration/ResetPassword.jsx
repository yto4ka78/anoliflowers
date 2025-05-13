import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./ResetPassword.module.scss";
import axios from "axios";
const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (newPassword !== repeatPassword) {
      setMessage("Пароли не совпадают");
      return;
    }

    try {
      const res = await axios.post("/api/login/resetPassword", {
        token,
        newPassword,
      });
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setMessage("Ошибка: токен недействителен или устарел");
    }
  };

  return (
    <div className={styles.passwordContainer}>
      <h1>Введите новый пароль</h1>
      {message ? (
        <div className={styles.notificationMessage}>{message}</div>
      ) : (
        ""
      )}
      <label className={styles.label} htmlFor="logEmail">
        Новый пароль
      </label>
      <input
        type="password"
        name="logEmail"
        className={styles.input}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <label className={styles.label} htmlFor="logEmail">
        Повторите новый пароль
      </label>
      <input
        type="password"
        name="logEmail"
        className={styles.input}
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Сменить пароль</button>
    </div>
  );
};

export default ResetPassword;
