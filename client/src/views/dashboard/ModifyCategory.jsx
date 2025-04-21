import React, { useEffect, useState } from "react";
import styles from "./ModifyCategory.module.scss";
import api from "../../utils/api";
const ModifyCategory = ({ category: initialCategory }) => {
  const [formData, setFormData] = useState({
    name: "",
    photo: [],
  });
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [category, setCategory] = useState(initialCategory);
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [photoToDeleted, setPhotoToDeleted] = useState([]);

  useEffect(() => {
    setFormData({
      name: initialCategory.Name,
      photo: [],
    });
    setPreviewPhotos(initialCategory.imageUrl);
  }, []);

  const removePhoto = (urlToRemove) => {
    const indexToRemove = previewPhotos.indexOf(urlToRemove);
    setPreviewPhotos((prev) => prev.filter((url) => url !== urlToRemove));

    setFormData((prev) => ({
      ...prev,
      photo: prev.photo.filter((_, index) => index !== indexToRemove),
    }));
    setPhotoToDeleted((prev) => [...prev, urlToRemove]);

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

  // ОТПРАВКА ФОРМЫ
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("id", initialCategory.id);
      data.append("name", formData.name);
      photoToDeleted.forEach((url) => {
        data.append("photoToDeleted", url);
      });
      if (formData.photo) {
        Array.from(formData.photo).forEach((file) => {
          data.append("photo", file);
        });
      }
      const response = await api.post("/dashboard/modifyCategory", data, {
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
    <div className={styles.modifyCategory_main}>
      <form onSubmit={handleSubmit} className={styles.modifyCategory_form}>
        <div
          className={`${styles.modifyCategory_message} ${
            showMessage ? styles.visible : styles.hidden
          }`}
        >
          {message}
        </div>
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
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
};

export default ModifyCategory;
