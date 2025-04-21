import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import styles from "./productPage.module.scss";
import Gallery from "../gallery/Gallery.jsx";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await api.get(`main/getProduct/${id}`);
        setProduct(response.data.bouquet);
      } catch (error) {
        alert("Ошибка загрузки букета");
      }
    };
    getProduct();
  }, []);
  if (!product) {
    return <div>Загрузка...</div>;
  }
  return (
    <div className={styles.productPage_mainDiv}>
      <div className={styles.header}>
        <Link to="/allCategories">Вернуться к выбору</Link>
        <div className={styles.header_text}>
          <div>Детали доставки вы можете уточнить с нашим оператором</div>
          <div>Все способы связи указаны во вкладке "Контакты"</div>
        </div>
      </div>

      <div className={styles.body}>
        <Gallery images={product.imageUrl} />
        <div className={styles.body_information}>
          <h3>{product.name}</h3>
          <div>Описание:</div>
          <div>{product.description}</div>
          <div>Цена: {product.price} тенге</div>
          <hr />
          <a
            href="https://wa.me/77075007006"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>Связаться с менеджером</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
