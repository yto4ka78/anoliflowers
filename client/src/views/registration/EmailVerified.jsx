import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./EmailVerified.module.scss";

const EmailVerified = () => {
  const [message, setMessage] = useState("Проверка токена...");
  const [success, setSuccess] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `/api/registration/verify-email?token=${token}`
        );
        const data = await response.json();
        setSuccess(true);
        setMessage(data.message);
      } catch (err) {
        setSuccess(false);
        setMessage("Ошибка сети или сервера");
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setSuccess(false);
      setMessage("Ошибка подтверждения почтового адресса");
    }
  }, [location.search]);

  return (
    <div className={styles.width}>
      <div
        className={`${styles.messageBox} ${
          success === true
            ? styles.success
            : success === false
            ? styles.error
            : ""
        }`}
      >
        <h1 className={styles.messageTitle}>{message}</h1>
        {success && (
          <p className={styles.subText}>
            Теперь вы можете войти в свой аккаунт.
          </p>
        )}
      </div>
    </div>
  );
};

export default EmailVerified;
