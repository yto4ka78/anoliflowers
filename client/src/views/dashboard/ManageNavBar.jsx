import React, { useEffect, useState } from "react";
import styles from "./manageNavBar.module.scss";
import api from "../../utils/api";

const ManageNavBar = () => {
  const [allCategories, setAllCategories] = useState([""]);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchcategories = async () => {
      try {
        const response = await api.post("/dashboard/getAllCategories");
        setAllCategories(response.data.categories);
      } catch (error) {}
    };
    fetchcategories();
  }, []);

  const handleCategoryChange = (index, value) => {
    const updated = [...selectedCategory];
    updated[index] = value;
    const filtered = [...new Set(updated.filter((v) => v))];
    setSelectedCategory(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.patch("/dashboard/modifyNavBar", {
        categories: selectedCategory,
      });
      setMessage(response.data.message);
      setShowMessage(true);
    } catch (error) {
      setMessage("❌ Ошибка при добавлении категории.");
      setShowMessage(true);
    }
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
    setTimeout(() => {
      setShowMessage(false);
      setMessage("");
    }, 6000);
  };

  return (
    <div className={styles.manageNavBar_main}>
      <form onSubmit={handleSubmit} className={styles.manageNavBar_form}>
        {/* Для отображения уведомления с сервер */}
        <div
          className={`${styles.manageNavBar_notification} ${
            showMessage ? styles.visible : styles.hidden
          }`}
        >
          {message}
        </div>
        <h3>Выберите категории в порядке иерархии слева направо</h3>
        <div>
          {[0, 1, 2].map((i) => (
            <div className={styles.manageNavBar_select}>
              <label htmlFor="firstCategory">{i + 1}.</label>
              <select
                key={i}
                name={`category${i}`}
                onChange={(e) => handleCategoryChange(i, e.target.value)}
                defaultValue=""
              >
                <option value="">Без Категории</option>
                {allCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.Name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
};

export default ManageNavBar;
