import React, { useEffect, useState } from "react";
import styles from "./manageCategories.module.scss";
import axios from "axios";
import api from "../../utils/api";

const ManageCategories = ({ setActiveView, setCategoryToModify }) => {
  const [formData, setFormData] = useState({
    name: "",
    photo: [],
  });
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const removePhoto = (urlToRemove) => {
    const indexToRemove = previewPhotos.indexOf(urlToRemove);
    setPreviewPhotos((prev) => prev.filter((url) => url !== urlToRemove));

    setFormData((prev) => ({
      ...prev,
      photo: prev.photo.filter((_, index) => index !== indexToRemove),
    }));

    URL.revokeObjectURL(urlToRemove);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFormData({ ...formData, photo: [...formData.photo, ...files] });

    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreviewPhotos([...previewPhotos, ...urls]);
  };

  useEffect(() => {
    const fetchcategories = async () => {
      try {
        const response = await api.post("/dashboard/getAllCategories");
        setAllCategories(response.data.categories);
      } catch (error) {}
    };
    fetchcategories();
  }, []);

  const handleDelete = async (categoryId) => {
    try {
      await api.delete(`/dashboard/deleteCategory/${categoryId}`);

      setMessage("✅ Категория удалена");
      setShowMessage(true);

      // Обновляем список категорий после удаления
      const updated = await api.post("/dashboard/getAllCategories");
      setAllCategories(updated.data.categories);
    } catch (error) {
      setMessage("❌ Ошибка при удалении категории");
      setShowMessage(true);
    }
    setTimeout(() => {
      setShowMessage(false);
      setMessage("");
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      if (formData.photo) {
        Array.from(formData.photo).forEach((file) => {
          data.append("photo", file);
        });
      }
      const response = await api.post("/dashboard/createCategory", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
    <div className={styles.manageCategories_main}>
      <form onSubmit={handleSubmit} className={styles.manageCategories_form}>
        <label htmlFor="">Название категории</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="photo">Загрузить фото</label>
        <input
          id="photo"
          name="photo"
          type="file"
          onChange={handleFileChange}
          multiple
        />
        <div className={styles.div_preview}>
          {previewPhotos.map((url, index) => (
            <div key={index} className={styles.preview}>
              <button type="button" onClick={() => removePhoto(url)}>
                ✖
              </button>
              <img src={url} alt={`Preview ${index + 1}`} />
            </div>
          ))}
        </div>
        <button type="submit">Добавить</button>

        <div
          className={`${styles.manageCategories_message} ${
            showMessage ? styles.visible : styles.hidden
          }`}
        >
          {message}
        </div>
      </form>

      {/* <div className={styles.manageCategories_listCategories}> */}
      <div className={styles.manageCategories_header}>
        <span className={styles.categories_column}>Название</span>
        <span className={styles.categories_column}></span>
        <span className={styles.categories_column}></span>
      </div>
      <div className={styles.manageCategories_body}>
        {allCategories.map((category) => (
          <div className={styles.categories}>
            <span className={styles.categories_column}>{category.Name}</span>
            <button
              onClick={() => {
                setCategoryToModify(category); // передаём выбранную категорию
                setActiveView("ModifyCategory"); // переключаем в окно редактирования
              }}
            >
              Изменить
            </button>
            <button onClick={() => handleDelete(category.id)}>Удалить</button>
          </div>
        ))}
      </div>
    </div>
    // </div>
  );
};

export default ManageCategories;
