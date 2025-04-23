import React from "react";
import styles from "./CheckboxListPriceMain.module.scss";

const CheckboxListPriceMain = () => {
  const options = [
    "до 25 000 ₸",
    "25 000 - 40 000 ₸",
    "40 000 - 55 000 ₸",
    "55 000 - 80 000 ₸",
    "от 75 000 ₸",
  ];

  return (
    <div className={styles.checkboxGroup}>
      {options.map((label, index) => (
        <label key={index} className={styles.checkboxLabel}>
          <input type="checkbox" name="flowers" />
          <span>{label}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckboxListPriceMain;
