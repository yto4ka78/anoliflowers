import React from "react";
import styles from "./FlowerShow.module.scss";
import { Link } from "react-router-dom";

const FlowerShow = ({ flower, index }) => {
  return (
    <div className={styles.main_product} key={index}>
      <Link
        className={styles.main_product_link}
        to={`/product_page/${flower.id}`}
        state={{ id: flower.id }}
      >
        <img src={flower.imageUrl[0]} alt={flower.name} />
      </Link>
      <div className={styles.flower_description}>
        <div className={styles.flowerName}>{flower.name}</div>
        <div className={styles.flowerStock}>Цветы в наличии</div>
        <div className={styles.flowerPrice}>
          {flower.saleprice ? (
            <div className={styles.flowerSaleStyles}>
              <div className={styles.flowerSalePrice}>{flower.saleprice} ₸</div>
              <div className={styles.flowerOldPrice}> {flower.price} ₸</div>
              <div className={styles.flowerPercentSale}>
                -
                {Math.round(
                  ((flower.price - flower.saleprice) / flower.price) * 100
                )}
                %
              </div>
            </div>
          ) : (
            <div className={styles.flowerNormalPrice}> {flower.price} ₸</div>
          )}
        </div>
        <div className={styles.flowerButton}>
          <button>Купить в 1 клик</button>
          <button>в корзину</button>
        </div>
      </div>
    </div>
  );
};

export default FlowerShow;
