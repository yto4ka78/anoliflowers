import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { Link } from "react-router-dom";
import styles from "./allcategory.module.scss";
import ContactWhatsApp from "../../UI/contactWhatsApp/ContactWhatsApp";

import PaginatedCategories from "../../UI/pagination/PaginatedCategories";

const AllCategory = () => {
  const [pupularCategories, setpupularCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState(null);
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
        setpupularCategories(
          response.data.allCategories.filter(
            (category) => category.showInPopular === true
          )
        );
        setCategorySelected(
          response.data.allCategories.filter(
            (category) => category.showAfterPopular === true
          )
        );
      } catch (error) {}
    };
    getAllCategory();
  }, []);
  return (
    <div className={styles.allCategories_main}>
      <div className={styles.allCategories_TextHeader}>
        <h2>
          Популярные <span>категории</span>
        </h2>
      </div>
      <div className={styles.allCategories_list}>
        {Array.isArray(pupularCategories) &&
          pupularCategories.map((category) => (
            <Link
              to={`/category/${category.id}`}
              key={category.id}
              state={{ id: category.id }}
              className={styles.allCategories_category}
            >
              <img src={category.imageUrl[0]} alt={category.Name} />
              <div className={styles.category_title}>{category.Name}</div>
            </Link>
          ))}
      </div>
      {categorySelected && (
        <div>
          <div className={styles.allCategories_TextHeader}>
            <h2>
              <span>Розы</span>
            </h2>
          </div>
          <div className={styles.allCategories_list}>
            {Array.isArray(categorySelected) &&
              categorySelected.map((category) => (
                <Link
                  to={`/category/${category.id}`}
                  key={category.id}
                  state={{ id: category.id }}
                  className={styles.allCategories_category}
                >
                  <img src={category.imageUrl[0]} alt={category.Name} />
                  <div className={styles.category_title}>{category.Name}</div>
                </Link>
              ))}
          </div>
        </div>
      )}
      {/* {categorySelected &&
        categorySelected.map((category) => (
          <div>
            <div className={styles.allCategories_TextHeader}>
              <h2>
                <span>Розы</span>
              </h2>
            </div>
            <div className={styles.allCategories_list}>
              {Array.isArray(pupularCategories) &&
                pupularCategories.map((category) => (
                  <Link
                    to={`/category/${category.id}`}
                    key={category.id}
                    state={{ id: category.id }}
                    className={styles.allCategories_category}
                  >
                    <img src={category.imageUrl[0]} alt={category.Name} />
                    <div className={styles.category_title}>{category.Name}</div>
                  </Link>
                ))}
            </div>
          </div>
        ))} */}
      <div className={styles.allCategories_TextHeader}>
        <h2>
          <span>Другие </span>категории
        </h2>
      </div>
      <div className={styles.allCategories_list}>
        {Array.isArray(allCategories) &&
          allCategories.map((category) => (
            <Link
              to={`/category/${category.id}`}
              key={category.id}
              state={{ id: category.id }}
              className={styles.allCategories_category}
            >
              <img src={category.imageUrl[0]} alt={category.Name} />
              <div className={styles.category_title}>{category.Name}</div>
            </Link>
          ))}
      </div>

      <ContactWhatsApp></ContactWhatsApp>

      <PaginatedCategories allBouquets={allBouquets} />
    </div>
  );
};

export default AllCategory;
