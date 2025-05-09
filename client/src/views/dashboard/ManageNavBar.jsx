import React, { useEffect, useState } from "react";
import styles from "./manageNavBar.module.scss";
import api from "../../utils/api";

const ManageNavBar = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const [newCategoryInMenu, setNewCategoryInMenu] = useState(null);
  const [categoriesInMernu, setCategoriesInMenu] = useState([]);

  const [newPopularCategory, setNewPopularCategory] = useState(null);
  const [popularCategories, setPopularCategories] = useState([]);

  const [newAfterPopularCategory, setNewAfterPopularCategory] = useState(null);
  const [afterPopularCategories, setAfterPopularCategories] = useState([]);

  useEffect(() => {
    const fetchcategories = async () => {
      try {
        const response = await api.post("/dashboard/getAllCategories");
        setAllCategories(response.data.categories);
        setCategoriesInMenu(
          response.data.categories.filter(
            (category) => category.showInMenu === true
          )
        );
        setPopularCategories(
          response.data.categories.filter(
            (category) => category.showInPopular === true
          )
        );
        setAfterPopularCategories(
          response.data.categories.filter(
            (category) => category.showAfterPopular === true
          )
        );
      } catch (error) {}
    };
    fetchcategories();
  }, []);

  function timerForNotification() {
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
    setTimeout(() => {
      setShowMessage(false);
      setMessage("");
    }, 6000);
  }
  const handleCategoryInMenuChange = (value) => {
    setNewCategoryInMenu(value);
  };
  const handlePopularCategoryChange = (value) => {
    setNewPopularCategory(value);
  };

  const handleNewAfterPopularCategoryChange = (value) => {
    setNewAfterPopularCategory(value);
  };

  const handleAddCategoryInMenu = async () => {
    try {
      const response = await api.patch("/dashboard/addCategoryInMenu", {
        category: newCategoryInMenu,
      });
      setCategoriesInMenu((prev) => [...prev, response.data.category]);
    } catch (error) {
      setMessage("❌ Ошибка обновите страницу и посмотрите изменения.");
      setShowMessage(true);
    }
    timerForNotification();
  };
  const handleAddPopularCategory = async () => {
    try {
      const response = await api.patch("/dashboard/addPopularCategory", {
        category: newPopularCategory,
      });
      setPopularCategories((prev) => [...prev, response.data.category]);
    } catch (error) {
      setMessage("❌ Ошибка обновите страницу и посмотрите изменения.");
      setShowMessage(true);
    }
    timerForNotification();
  };

  const handleAddAfterPopularCategory = async () => {
    try {
      const response = await api.patch("/dashboard/addAfterPopularCategory", {
        category: newAfterPopularCategory,
      });
      setAfterPopularCategories((prev) => [...prev, response.data.category]);
    } catch (error) {
      setMessage("❌ Ошибка обновите страницу и посмотрите изменения.");
      setShowMessage(true);
    }
    timerForNotification();
  };

  const handleDeleteCategory = async (categoryId, type) => {
    try {
      await api.patch("/dashboard/deleteCategoryFromMenu", {
        id: categoryId,
        type: type, // например: "menu", "popular", "afterPopular"
      });

      if (type === "menu") {
        setCategoriesInMenu((prev) =>
          prev.filter((cat) => cat.id !== categoryId)
        );
      } else if (type === "popular") {
        setPopularCategories((prev) =>
          prev.filter((cat) => cat.id !== categoryId)
        );
      } else if (type === "afterPopular") {
        setAfterPopularCategories((prev) =>
          prev.filter((cat) => cat.id !== categoryId)
        );
      }
    } catch (error) {
      setMessage("❌ Ошибка при удалении категории.");
      setShowMessage(true);
    }
    timerForNotification();
  };

  return (
    <div className={styles.manageNavBar_main}>
      <div className={styles.manageNavBar_title}>
        Добавление категорий для кнопки "Меню":
      </div>
      <form action="" className={styles.form}>
        <label htmlFor="">Выбрать категорию из существующих:</label>
        <div>
          <select onChange={(e) => handleCategoryInMenuChange(e.target.value)}>
            {allCategories.map((category, index) => (
              <option key={category.id} value={category.id}>
                {category.Name}
              </option>
            ))}
          </select>
          <button
            className={styles.button_addCategory}
            type="button"
            onClick={handleAddCategoryInMenu}
          >
            ✚
          </button>
        </div>
      </form>
      <div className={styles.categotyInMenu}>
        {categoriesInMernu.map((category, index) => (
          <div key={index} className={styles.category}>
            <div>{category.Name}</div>
            <button onClick={() => handleDeleteCategory(category.id, "menu")}>
              Удалить
            </button>
          </div>
        ))}
      </div>

      <div className={styles.manageNavBar_title}>
        Категории в блоке "Популярные категории":
      </div>
      <form action="" className={styles.form}>
        <label htmlFor="">Выбрать категорию из существующих:</label>
        <div>
          <select onChange={(e) => handlePopularCategoryChange(e.target.value)}>
            {allCategories.map((category, index) => (
              <option key={category.id} value={category.id}>
                {category.Name}
              </option>
            ))}
          </select>
          <button
            className={styles.button_addCategory}
            type="button"
            onClick={handleAddPopularCategory}
          >
            ✚
          </button>
        </div>
      </form>
      <div className={styles.categotyInMenu}>
        {popularCategories.map((category, index) => (
          <div key={index} className={styles.category}>
            <div>{category.Name}</div>
            <button
              onClick={() => handleDeleteCategory(category.id, "popular")}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>

      <div className={styles.manageNavBar_title}>Розы:</div>
      <form action="" className={styles.form}>
        <label htmlFor="">Выбрать категорию из существующих:</label>
        <div>
          <select
            onChange={(e) =>
              handleNewAfterPopularCategoryChange(e.target.value)
            }
          >
            {allCategories.map((category, index) => (
              <option key={category.id} value={category.id}>
                {category.Name}
              </option>
            ))}
          </select>
          <button
            className={styles.button_addCategory}
            type="button"
            onClick={handleAddAfterPopularCategory}
          >
            ✚
          </button>
        </div>
      </form>
      <div className={styles.categotyInMenu}>
        {afterPopularCategories.map((category, index) => (
          <div key={index} className={styles.category}>
            <div>{category.Name}</div>
            <button
              onClick={() => handleDeleteCategory(category.id, "afterPopular")}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageNavBar;
