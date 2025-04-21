import React, { useState } from "react";
import styles from "./Gallery.module.scss"; // или .css

const Gallery = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <a href={mainImage} target="_blank" rel="noopener noreferrer">
          <img src={mainImage} alt="Главная фотография" />
        </a>
      </div>
      <div className={styles.thumbnails}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Фото ${index + 1}`}
            onClick={() => setMainImage(img)}
            className={img === mainImage ? styles.active : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
