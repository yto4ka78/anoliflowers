import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import styles from "./categorySpecial.module.scss";
import PaginatedCategories from "../../UI/pagination/PaginatedCategories";
import { useParams } from "react-router-dom";

const CategorySpecial = () => {
  const { id } = useParams();
  const [nameCategory, setNameCategory] = useState("");
  const [allBouquets, setAllBouquets] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/main/getBouquets/${id}`);
        const category = response.data.category;

        setAllBouquets(category.Bouquets);
        setNameCategory(category.Name);
      } catch (error) {}
    };
    fetchData();
  }, [id]);

  return (
    <div className={styles.categorySpecial_main}>
      <h3>{nameCategory}</h3>
      <h5>Если у вас возникли вопросы, пишите на на ватсап!</h5>
      {!Array.isArray(allBouquets) ? (
        <div>Загрузка букетов...</div>
      ) : (
        <PaginatedCategories allBouquets={allBouquets} />
      )}
    </div>
  );
};

export default CategorySpecial;
