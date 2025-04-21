import React, { useState, useEffect } from "react";
import styles from "./ModifyBouquet.module.scss";
import api from "../../utils/api";

const ModifyBouquet = ({ bouquet }) => {
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
  const [photoToDeleted, setPhotoToDeleted] = useState([]);
  const [bouquetId, setBouquetId] = useState("");
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
    setFormData((prev) => ({
      name: bouquet.name,
      description: bouquet.description,
      price: bouquet.price,
      photo: [],
    }));
    setPreviewPhotos(bouquet.imageUrl);
    const categoryIds = bouquet.Categories.map((cat) => String(cat.id));
    setCategoriesSelected(categoryIds);
    setBouquetId(bouquet.id);
  }, []);

  //Я совместил 2 useEffect, если будет ошибка, убрать комментарии

  // useEffect(() => {
  //   setFormData((prev) => ({
  //     name: bouquet.name,
  //     description: bouquet.description,
  //     price: bouquet.price,
  //     photo: [],
  //   }));
  //   setPreviewPhotos(bouquet.imageUrl);
  //   const categoryIds = bouquet.Categories.map((cat) => String(cat.id));
  //   setCategoriesSelected(categoryIds);
  //   setBouquetId(bouquet.id);
  // }, []);

  const removeCategory = (idToRemove) => {
    setCategoriesSelected((prev) => prev.filter((cat) => cat !== idToRemove));
  };

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
    setPhotoToDeleted((prev) => [...prev, urlToRemove]);
    URL.revokeObjectURL(urlToRemove);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("bouquetId", bouquetId);
    photoToDeleted.forEach((photoId) => {
      data.append("photoToDeleted[]", photoId);
    });
    categoriesSelected.forEach((catId) => {
      data.append("categories[]", catId);
    });
    if (formData.photo) {
      Array.from(formData.photo).forEach((file) => {
        data.append("photo", file);
      });
    }
    try {
      const response = await api.post("/bouquet/modifyBouquet", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setShowMessage(true);
      setMessage("Букет сохранен");
    } catch (error) {
      if (error.response) {
        setShowMessage(true);
        setMessage(error.response.data.message);
      } else {
        setShowMessage(true);
        setMessage("Ошибка изменения букета");
      }
    }
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
    setTimeout(() => {
      setShowMessage(false);
      setMessage("");
    }, 6000);
  };

  if (!bouquet) {
    return (
      <div>
        <h2>Ошибка загрузки букета</h2>
      </div>
    );
  }

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
            const category = allCategories.find((cat) => String(cat.id) === id);
            return (
              <div key={id}>
                <div
                  className={styles.createBouquet_main_form_categorySelected}
                >
                  {category?.Name || "Категория не найдена"}
                  <button type="button" onClick={() => removeCategory(id)}>
                    Удалить
                  </button>
                </div>
                <hr />
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
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
};

export default ModifyBouquet;
