import React, { useState, useEffect } from "react";
import styles from "./createBouquet.module.scss";
import api from "../../utils/api";
import axios from "axios";

const CreateBouquet = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    photo: [],
  });
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchcategories = async () => {
      try {
        const response = await api.post("/dashboard/getAllCategories");
        setAllCategories(response.data.categories);
      } catch (error) {}
    };
    fetchcategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addCategory = () => {
    if (
      selectedCategoryId &&
      !categoriesSelected.includes(selectedCategoryId)
    ) {
      setCategoriesSelected([...categoriesSelected, selectedCategoryId]);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFormData({ ...formData, photo: [...formData.photo, ...files] });

    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreviewPhotos([...previewPhotos, ...urls]);
  };

  const removePhoto = (urlToRemove) => {
    const indexToRemove = previewPhotos.indexOf(urlToRemove);
    setPreviewPhotos((prev) => prev.filter((url) => url !== urlToRemove));

    setFormData((prev) => ({
      ...prev,
      photo: prev.photo.filter((_, index) => index !== indexToRemove),
    }));

    URL.revokeObjectURL(urlToRemove);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    categoriesSelected.forEach((catId) => {
      data.append("categories[]", catId);
    });
    if (formData.photo) {
      Array.from(formData.photo).forEach((file) => {
        data.append("photo", file);
      });
    }
    try {
      const response = await api.post("/bouquet/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setShowMessage(true);
      setMessage("Букет сохранен");
    } catch (error) {
      setShowMessage(true);
      setMessage("Ошибка добавления букета " + error.response.data.message);
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
    <div className={styles.createBouquet_main}>
      <form className={styles.createBouquet_main_form} onSubmit={handleSubmit}>
        <div
          className={`${styles.createBouquet_message} ${
            showMessage ? styles.visible : styles.hidden
          }`}
        >
          {message}
        </div>
        <label htmlFor="name">Название букета</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="description">Описание</label>
        <textarea
          id="description"
          name="description"
          type="text"
          value={formData.description}
          onChange={handleChange}
        />
        <label htmlFor="price">Цена</label>
        <input
          id="price"
          name="price"
          type="text"
          value={formData.price}
          onChange={handleChange}
        />
        <label htmlFor="category">Категория</label>
        <div className={styles.createBouquet_main_form_category}>
          <select
            id="category"
            name="category"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
          >
            <option value="">Без категории</option>
            {allCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.Name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => {
              addCategory();
            }}
          >
            ✚
          </button>
        </div>
        <div>
          {categoriesSelected.map((id) => {
            const category = allCategories.find((cat) => cat.id == id);
            return (
              <div
                className={styles.createBouquet_main_form_categorySelected}
                key={id}
              >
                {category?.Name} <hr />
              </div>
            );
          })}
        </div>
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
      </form>
    </div>
  );
};

export default CreateBouquet;
