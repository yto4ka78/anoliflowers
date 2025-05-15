// CheckboxListPriceMain.jsx
import React, { useState } from "react";
import styles from "./CheckboxListPriceMain.module.scss";

const CheckboxListPriceMain = ({ onFilterChange }) => {
  const options = [
    { label: "до 25 000 ₸", range: [0, 25000] },
    { label: "25 000 - 40 000 ₸", range: [25000, 40000] },
    { label: "40 000 - 55 000 ₸", range: [40000, 55000] },
    { label: "55 000 - 80 000 ₸", range: [55000, 80000] },
    { label: "от 75 000 ₸", range: [75000, Infinity] },
  ];

  const [selected, setSelected] = useState([]);

  const handleChange = (range) => {
    let updated = [...selected];
    const alreadySelected = updated.find(
      (item) => item[0] === range[0] && item[1] === range[1]
    );
    if (alreadySelected) {
      updated = updated.filter(
        (item) => !(item[0] === range[0] && item[1] === range[1])
      );
    } else {
      updated.push(range);
    }
    setSelected(updated);
    onFilterChange(updated);
  };

  return (
    <div className={styles.checkboxGroup}>
      {options.map(({ label, range }, index) => (
        <label key={index} className={styles.checkboxLabel}>
          <input
            type="checkbox"
            onChange={() => handleChange(range)}
            checked={selected.some(
              (item) => item[0] === range[0] && item[1] === range[1]
            )}
          />
          <span>{label}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckboxListPriceMain;
