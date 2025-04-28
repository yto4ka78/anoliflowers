import React, { useState } from "react";
import styles from "./registration.module.scss";
import axios from "axios";

const Registration = () => {
  //for registration
  const [regFormData, setregFormData] = useState({
    regEmail: "",
    regPassword: "",
    regRepPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setregFormData({ ...regFormData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (regFormData.regPassword !== regFormData.regRepPassword) {
      return setErrorMessage("Пароль не совпадает");
    }
    const data = new FormData();
    data.append("email", regFormData.regEmail);
    data.append("password", regFormData.regPassword);
    try {
      const response = await axios.post(
        "/api/registration/registration",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Вы успешно зарегестрировались, подтвердите почтовый адрес");
    } catch (error) {
      console.error("Ошибка регистрации из реакт:", error);
      alert("Ошибка регистрации");
    }
  };

  return (
    <div className={styles.registrationContainer}>
      <h1>Регистрация</h1>
      <form className={styles.loginForm}>
        <label className={styles.label} htmlFor="username">
          Email *
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className={styles.input}
        />
        <div className={styles.registrationText}>
          Пароль будет отправлен на ваш мейл адрес.
        </div>
        <div className={styles.registrationText}>
          Ваши личные данные будут использоваться для упрощения вашей работы с
          сайтом, управления доступом к вашей учётной записи и для других целей,
          описанных в нашей
          <a href=""> Политика конфиденциальности</a>.
        </div>
        <button type="submit" className={styles.submitButton}>
          ВОЙТИ
        </button>
      </form>
    </div>
  );
};

export default Registration;
