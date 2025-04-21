import React, { useEffect, useState } from "react";
import styles from "./notificationMessage.module.scss";

const NotificationMessage = ({ message, isActive }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer;

    if (isActive) {
      setVisible(true); // показать уведомление
      timer = setTimeout(() => {
        setVisible(false); // скрыть через 5 секунд
      }, 5000);
    }

    return () => clearTimeout(timer); // очистка таймера при размонтировании или изменении
  }, [isActive]);

  return visible ? (
    <div
      className={`${styles.notoficationMessage} ${
        visible ? styles.visible : styles.hidden
      }`}
    >
      {message}
    </div>
  ) : null;
};

export default NotificationMessage;
