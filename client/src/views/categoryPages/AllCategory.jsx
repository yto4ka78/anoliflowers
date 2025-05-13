import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { Link } from "react-router-dom";
import styles from "./allcategory.module.scss";

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
      {categorySelected &&
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
        ))}
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

      <div className={styles.main_contact_width}>
        <div className={styles.contact_firstSection}>
          <div>Оставьте заявку и мы соберем для вас идеальный букет</div>
          <div>Заполните форму и мы свяжемся с Вами в ближайшее время.</div>
        </div>
        <div className={styles.contact_secondSection}>
          <div className={styles.contact_secondSection_input}>
            <input type="text" placeholder="+7 (ˍˍˍ) ˍˍˍ ˍˍ ˍˍ" />
            <img src="icon_phone.svg" alt="" />
          </div>
          <button>Отправить заявку</button>
          <div className={styles.contact_secondSection_checkbox}>
            <label className={styles.custom_checkbox}>
              <input type="checkbox" defaultChecked />
              <span className={styles.checkmark}></span>
            </label>
            <div>
              Нажимая на кнопку, вы даёте согласие на обработку персональных
              данных
            </div>
          </div>
        </div>
        <div className={styles.contact_thirdSection}>
          <img src="/womanManager.webp" alt="" />
          <div>Менеджер перезвонит вам, чтобы уточнить удобное время</div>
        </div>
      </div>

      <PaginatedCategories allBouquets={allBouquets} />
    </div>
  );
};

export default AllCategory;
