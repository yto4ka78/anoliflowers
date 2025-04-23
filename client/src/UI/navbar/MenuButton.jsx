import React from "react";
import styles from "./MenuButton.module.scss";

const MenuButton = () => {
  return (
    <button className={styles.menu_button}>
      <div className={styles.dots}>
        {[...Array(9)].map((_, i) => (
          <span key={i} />
        ))}
      </div>
      <span className={styles.text}>МЕНЮ</span>
    </button>
  );
};

export default MenuButton;
