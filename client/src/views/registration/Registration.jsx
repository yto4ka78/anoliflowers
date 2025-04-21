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

  //For login
  const [logFormData, setLogFormData] = useState({
    logEmail: "",
    logPassword: "",
  });

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
    <div className={styles.registration_main}>
      <div className={styles.registration_main_forms}>
        <div className={styles.registration_main_connexForm}>
          <div>Подключиться</div>
          <form action="" onSubmit={handleLoginSubmit}>
            <label htmlFor="logEmail">Почтовый адрес</label>
            <input
              id="logEmail"
              name="logEmail"
              type="email"
              onChange={handleChangeLogin}
            />
            <label htmlFor="logPassword">Пароль</label>
            <input
              id="logPassword"
              name="logPassword"
              type="password"
              onChange={handleChangeLogin}
            />
            {errorMessage && (
              <div className={styles.errorDiv}>{errorMessage}</div>
            )}
            <button>Войти</button>
          </form>
        </div>
        {/* ЕСЛИ НУЖНО ДОБАВИТЬ РЕГИСТРАЦИЮ, ВОТ ФОРМА */}
        {/* <div className={styles.registration_main_regForm}>
          <div>Зарегестрироваться</div>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="regEmail">Почтовый адрес</label>
            <input
              id="regEmail"
              type="email"
              name="regEmail"
              onChange={handleChange}
            />
            <label htmlFor="regPassword">Пароль</label>
            <input
              id="regPassword"
              type="password"
              onChange={handleChange}
              name="regPassword"
            />
            <label htmlFor="regRepPassword">Повторите пароль</label>
            <input
              id="regRepPassword"
              type="password"
              onChange={handleChange}
              name="regRepPassword"
            />
            <div>{errorMessage}</div>
            <button>Зарегестрироваться</button>
            <label>
              <input type="checkbox" /> Я принимаю условия регистрационных
              данных
            </label>
          </form>
        </div> */}
      </div>
    </div>
  );
};

export default Registration;
