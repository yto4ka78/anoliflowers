import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./EmailChanged.module.scss";
import api from "../../utils/api";
const EmailChanged = () => {
  const [message, setMessage] = useState("Проверка токена...");
  const [success, setSuccess] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    const verifyEmail = async () => {
      try {
        const response = await api.post(`/login/verifyEmail?token=${token}`);
        const data = response.data;
        setSuccess(true);
        setMessage(data.message);
      } catch (err) {
        setSuccess(false);
        setMessage("Ссылка не действительна");
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
        {success && <p className={styles.subText}>Почтовый адрес изменен.</p>}
      </div>
    </div>
  );
};

export default EmailChanged;
