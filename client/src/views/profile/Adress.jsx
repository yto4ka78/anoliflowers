import React from "react";
import styles from "./Adress.module.scss";

const Adress = () => {
  return (
    <div className={styles.adressContainer}>
      <div className={styles.adressTitle}>
        Следующие адреса будут использованы по умолчанию при оформлении заказов.
      </div>
      <div>
        <div className={styles.check_adressSubtitle}>Платежный адрес</div>
        <button>Изменить</button>
        <p>Нет адреса</p>
      </div>
      <div>
        <div className={styles.check_adressSubtitle}>Платежный адрес</div>
        <button>Изменить</button>
        <p>Нет адреса</p>
      </div>
    </div>
  );
};

export default Adress;
