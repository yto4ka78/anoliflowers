import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./profile.module.scss";
import NotificationMessage from "../../UI/notificationMessage/NotificationMessage";
import api from "../../utils/api";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    familyname: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await api.post("/login/getUserData");
        const user = response.data.user;
        setFormData({
          name: user.name,
          surname: user.surname,
          familyname: user.familyname,
          email: user.email,
        });
      } catch (error) {}
    };
    getUserInfo();
  }, []);
  const handleSubmitInfo = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login/changeProfileInfo", formData);
      setResponseMessage(response.data.message);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setResponseMessage("");
    }
  };

  return (
    <div className={styles.profile_mainContainer}>
      <form action="" onSubmit={handleSubmitInfo}>
        <div>
          <div className={styles.profile_title}>Контактная информация</div>
          {responseMessage && (
            <div className={styles.successContainer}>
              <div className={styles.successMessage}>✅ {responseMessage}</div>
            </div>
          )}
          {errorMessage && (
            <div className={styles.errorContainer}>
              <div className={styles.errorTitle}>
                Ошибка обновления профиля:
              </div>
              <div className={styles.errorMessage}>⚠️ {errorMessage}</div>
            </div>
          )}
          <div className={styles.profile_mainSection}>
            <div className={styles.profile_section}>
              <label htmlFor="name"> Имя *</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChangeForm}
                value={formData.name}
              />
              <label htmlFor="surname"> Отображаемое имя *</label>
              <input
                type="text"
                id="surname"
                name="surname"
                onChange={handleChangeForm}
                value={formData.surname}
              />
            </div>
            <div className={styles.profile_section}>
              <label htmlFor="familyname"> Фамилия *</label>
              <input
                type="text"
                id="familyname"
                name="familyname"
                onChange={handleChangeForm}
                value={formData.familyname}
              />
              <label htmlFor="email"> Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChangeForm}
                value={formData.email}
              />
            </div>
          </div>
        </div>
        <div>
          <div className={styles.profile_title}>Контактная информация</div>
          <div className={styles.profile_section}>
            <label htmlFor="oldPassword">
              {" "}
              Действующий пароль (не заполняйте, чтобы оставить прежний)
            </label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              onChange={handleChangeForm}
              value={formData.oldPassword}
            />
            <label htmlFor="newPassword">
              {" "}
              Новый пароль (не заполняйте, чтобы оставить прежний)
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              onChange={handleChangeForm}
              value={formData.newPassword}
            />
            <label htmlFor="repeatPassword"> Подтвердите новый пароль</label>
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              onChange={handleChangeForm}
              value={formData.repeatPassword}
            />
          </div>
        </div>
        <button type="submit">СОХРАНИТЬ</button>
      </form>
    </div>
  );
};

export default Profile;
