import React, { useEffect, useState } from "react";
import styles from "./manageBouquet.module.scss";
import api from "../../utils/api";
import axios from "axios";

const ManageBouquet = ({ setActiveView, setSelectedBouquet }) => {
  const [listBouquets, setListBouquets] = useState([]);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const respons = await api.post("/bouquet/getAllBouquets");
        setListBouquets(respons.data.bouquets);
      } catch (error) {}
    };
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/bouquet/handleDelete/${id}`);
      setMessage("✅ Букет удалена");
      setShowMessage(true);
      const respons = await api.post("/bouquet/getAllBouquets");
      setListBouquets(respons.data.bouquets);
    } catch (error) {
      setMessage("❌ Ошибка при удалении букета");
      setShowMessage(true);
    }
    setTimeout(() => {
      setShowMessage(false);
      setMessage("");
    }, 5000);
  };

  return (
    <div>
      <div
        className={`${styles.manageBouquets_message} ${
          showMessage ? styles.visible : styles.hidden
        }`}
      >
        {message}
      </div>
      <div className={styles.manageBouquet_header}>
        <span className={styles.bouquet_column}>Букет</span>
        <span className={styles.bouquet_column}>Категория</span>
        <span className={styles.bouquet_column}>Цена</span>
        <span className={styles.bouquet_column}></span>
        <span className={styles.bouquet_column}></span>
      </div>
      <div className={styles.manageBouquet_body}>
        {listBouquets.map((bouquet) => (
          <div className={styles.Bouquet}>
            <span className={styles.bouquet_column}>{bouquet.name}</span>
            <span className={styles.bouquet_column}>
              {bouquet.Categories.map((cat) => cat.Name).join(", ")}
            </span>
            <span className={styles.bouquet_column}>{bouquet.price} тг.</span>
            <button
              type="button"
              onClick={() => {
                setActiveView("ModifyBouquet");
                setSelectedBouquet(bouquet);
              }}
              className={styles.bouquet_column}
            >
              Подробно
            </button>
            <button
              type="button"
              onClick={() => {
                handleDelete(bouquet.id);
              }}
              className={styles.bouquet_column}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBouquet;
