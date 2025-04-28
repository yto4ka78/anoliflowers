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
    <div className={styles.profile_mainContainer}>
      <form action="">
        <div>
          <div className={styles.profile_title}>Контактная информация</div>
          <div className={styles.profile_mainSection}>
            <div className={styles.profile_section}>
              <label htmlFor=""> Имя *</label>
              <input type="text" />
              <label htmlFor=""> Отображаемое имя *</label>
              <input type="text" />
            </div>
            <div className={styles.profile_section}>
              <label htmlFor=""> Фамилия *</label>
              <input type="text" />
              <label htmlFor=""> Email *</label>
              <input type="email" />
            </div>
          </div>
        </div>
        <div>
          <div className={styles.profile_title}>Контактная информация</div>
          <div className={styles.profile_section}>
            <label htmlFor="">
              {" "}
              Действующий пароль (не заполняйте, чтобы оставить прежний)
            </label>
            <input type="text" />
            <label htmlFor="">
              {" "}
              Новый пароль (не заполняйте, чтобы оставить прежний)
            </label>
            <input type="text" />
            <label htmlFor=""> Подтвердите новый пароль</label>
            <input type="text" />
          </div>
        </div>
        <button>СОХРАНИТЬ</button>
      </form>
    </div>
  );
};

export default Profile;
