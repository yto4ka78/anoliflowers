import React, { useEffect, useState } from "react";
import styles from "./manageNavBar.module.scss";
import api from "../../utils/api";

const ManageNavBar = () => {
  const [allCategories, setAllCategories] = useState([""]);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoriesInMernu, setCategoriesInMenu] = useState([
    {
      id: 21,
      Name: "Розы",
      createdAt: "2025-04-02 13:34:41",
      updatedAt: "2025-04-07 19:16:16",
      showInNavbar: 1,
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743617500/ReactNode/Category/kcpsdwgrihy7kh1qp1qu.jpg",
      ],
    },
    {
      id: 22,
      Name: "Фиалки",
      createdAt: "2025-04-02 13:34:56",
      updatedAt: "2025-04-07 19:16:16",
      showInNavbar: 1,
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743617500/ReactNode/Category/kcpsdwgrihy7kh1qp1qu.jpg",
      ],
    },
    {
      id: 23,
      Name: "Фиолетовые цветы",
      createdAt: "2025-04-02 16:01:26",
      updatedAt: "2025-04-07 19:16:16",
      showInNavbar: 1,
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743617500/ReactNode/Category/kcpsdwgrihy7kh1qp1qu.jpg",
      ],
    },
  ]);

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
      <div className={styles.manageNavBar_title}>
        Добавление категорий для кнопки "меню":
      </div>
      <form action="" className={styles.form}>
        <label htmlFor="">Выбрать категорию из существующих:</label>
        <div>
          <select name="" id="">
            <option value=""></option>
          </select>
          <button className={styles.button_addCategory} type="button">
            ✚
          </button>
        </div>
      </form>
      <div className={styles.categotyInMenu}>
        {categoriesInMernu.map((category, index) => (
          <div key={index} className={styles.category}>
            <div>{category.Name}</div>
            <button>Удалить</button>
          </div>
        ))}
      </div>
      <div className={styles.manageNavBar_title}>
        Категории в блоке "Популярные категории":
      </div>
      <form action="" className={styles.form}>
        <label htmlFor="">Выбрать категорию из существующих:</label>
        <div>
          <select name="" id="">
            <option value=""></option>
          </select>
          <button className={styles.button_addCategory} type="button">
            ✚
          </button>
        </div>
      </form>
      <div className={styles.categotyInMenu}>
        {categoriesInMernu.map((category, index) => (
          <div key={index} className={styles.category}>
            <div>{category.Name}</div>
            <button>Удалить</button>
          </div>
        ))}
      </div>
      <div className={styles.manageNavBar_title}>
        Категории которые следуют после блока "Популярные категории":
      </div>
      <form action="" className={styles.form}>
        <label htmlFor="">Выбрать категорию из существующих:</label>
        <div>
          <select name="" id="">
            <option value=""></option>
          </select>
          <button className={styles.button_addCategory} type="button">
            ✚
          </button>
        </div>
      </form>
      <div className={styles.categotyInMenu}>
        {categoriesInMernu.map((category, index) => (
          <div key={index} className={styles.category}>
            <div>{category.Name}</div>
            <button>Удалить</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageNavBar;
