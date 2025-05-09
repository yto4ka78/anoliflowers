import React, { useState } from "react";
import styles from "./registration.module.scss";
import axios from "axios";

const Registration = () => {
  const [regFormData, setregFormData] = useState({
    regEmail: "",
    regPassword: "",
    regRepPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [colorMessage, setColorMessage] = useState(null);
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
      const response = await axios.post("/api/registration/registration", {
        email: regFormData.regEmail,
        password: regFormData.regPassword,
      });
      setColorMessage(response.data.condition);
      setErrorMessage(response.data.message);
    } catch (error) {
      const errData = error.response?.data;
      setColorMessage(errData?.condition || false);
      setErrorMessage(errData?.message || "Ошибка сервера");
    }
  };

  return (
    <div className={styles.registrationContainer}>
      <h1>Регистрация</h1>
      {errorMessage && (
        <div className={colorMessage ? styles.success : styles.error}>
          {errorMessage}
        </div>
      )}
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="regEmail">
          Email *
        </label>
        <input
          type="email"
          id="regEmail"
          name="regEmail"
          className={styles.input}
          value={regFormData.regEmail}
          onChange={handleChange}
        />
        <label className={styles.label} htmlFor="regPassword">
          Пароль *
        </label>
        <input
          type="password"
          id="regPassword"
          name="regPassword"
          className={styles.input}
          value={regFormData.regPassword}
          onChange={handleChange}
        />
        <label className={styles.label} htmlFor="regRepPassword">
          Повторите пароль *
        </label>
        <input
          type="password"
          id="regRepPassword"
          name="regRepPassword"
          className={styles.input}
          value={regFormData.regRepPassword}
          onChange={handleChange}
        />
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
