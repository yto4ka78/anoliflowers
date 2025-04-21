import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./profile.module.scss";
import NotificationMessage from "../../UI/notificationMessage/NotificationMessage";
import api from "../../utils/api";

const Profile = () => {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState({
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
  });
  const [responMessage, setResponseMessage] = useState({
    message: "",
    boolean: false,
  });
  const [notifKey, setNotifKey] = useState(0);
  const showNotification = () => {
    setNotifKey((prev) => prev + 1);
  };

  const handleChagePassword = (e) => {
    const { name, value } = e.target;
    setFormPassword({ ...formPassword, [name]: value });
  };
  // const handleChageEmail = (e) => {
  //   setFormEmail(e.target.value);
  // };
  // const handleSubmitEmail = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await api.post("/main/changeProfileEmail", {
  //       email: formEmail,
  //     });
  //     const res = response.data.message;
  //   } catch (error) {}
  // };
  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login/changeProfilePassword", {
        oldPassword: formPassword.oldPassword,
        newPassword: formPassword.newPassword,
        repeatPassword: formPassword.repeatPassword,
      });
      setResponseMessage({
        message: response.data.message,
        boolean: true,
      });
      showNotification();
    } catch (error) {}
  };
  return (
    <div className={styles.profile_main}>
      {/* <div className={styles.profile_main_profile}>
        <form onSubmit={handleSubmitEmail}>
          <NotificationMessage />
          <label htmlFor="">Имя</label>
          <input type="text" />
          <label htmlFor="">Номер телефона</label>
          <input type="text" />
          <label htmlFor="">Почтовый адрес</label>
          <input
            id="email"
            name="email"
            type="text"
            value={formPassword.name}
            onChange={handleChageEmail}
          />
          <button>Изменить адрес</button>
        </form>
      </div> */}
      <div className={styles.profile_main_profile}>
        <form onSubmit={handleSubmitPassword} action="">
          <NotificationMessage
            message={responMessage.message}
            isActive={responMessage.boolean}
          />
          <label htmlFor="">Старый пароль</label>
          <input
            id="oldPassword"
            name="oldPassword"
            type="password"
            value={formPassword.oldPassword}
            onChange={handleChagePassword}
          />
          <label htmlFor="">Новый пароль</label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            value={formPassword.newPassword}
            onChange={handleChagePassword}
          />
          <label htmlFor="">Повторите новый пароль</label>
          <input
            id="repeatPassword"
            name="repeatPassword"
            type="password"
            value={formPassword.repeatPassword}
            onChange={handleChagePassword}
          />
          <button>Изменить пароль</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
