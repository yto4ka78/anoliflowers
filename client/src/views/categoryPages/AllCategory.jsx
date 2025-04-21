import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { Link } from "react-router-dom";
import styles from "./allcategory.module.scss";

import PaginatedCategories from "../../UI/pagination/PaginatedCategories";

const AllCategory = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [allBouquets, setAllBouquets] = useState([]);
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);

  const offset = currentPage * itemsPerPage;
  const currentItems = (allCategories || []).slice(
    offset,
    offset + itemsPerPage
  );

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const response = await api.get("/main/allCategories");
        setAllBouquets(response.data.allBouquets);
        setAllCategories(response.data.allCategories);
      } catch (error) {}
    };
    getAllCategory();
  }, []);
  return (
    <div className={styles.allCategories_main}>
      <div className={styles.allCategories_TextHeader}>
        <h3>Наш каталог</h3>
        <h6>Здесь вы можете выбрать подходящую для вас коллекцию</h6>
      </div>
      <div className={styles.allCategories_list}>
        {Array.isArray(allCategories) &&
          allCategories.map((category) => (
            <div key={category.id} className={styles.allCategories_category}>
              <Link to={`/category/${category.id}`} state={{ id: category.id }}>
                <img src={category.imageUrl[0]} alt={category.Name} />
              </Link>
              <div className={styles.allCategories_category_flex}>
                <div>{category.Name}</div>
                <Link
                  to={`/category/${category.id}`}
                  state={{ id: category.id }}
                >
                  <button>Посмотреть</button>
                </Link>
              </div>
            </div>
          ))}
      </div>
      <div className={styles.allCategories_TextHeader}>
        <h3>Все букеты</h3>
        <h6>Посмотрите все букеты, и выберите подходящий для вас</h6>
      </div>
      <PaginatedCategories allBouquets={allBouquets} />
    </div>
  );
};

export default AllCategory;
