import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { Link } from "react-router-dom";
import styles from "./allcategory.module.scss";

import PaginatedCategories from "../../UI/pagination/PaginatedCategories";

const AllCategory = () => {
  const [pupularCategories, setpupularCategories] = useState([
    {
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743600807/ReactNode/Category/himcahhanly7nhagni6i.jpg",
      ],
      id: "21",
      Name: "Розы",
      showInMenu: true,
      showInPopular: null,
      showAfterPopular: null,
      createdAt: "2025-04-02T13:34:41.000Z",
      updatedAt: "2025-04-07T19:16:16.000Z",
    },
    {
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743600822/ReactNode/Category/fz3fpf4ugukhqtemsfjz.jpg",
      ],
      id: "22",
      Name: "Фиалки",
      showInMenu: true,
      showInPopular: null,
      showAfterPopular: null,
      createdAt: "2025-04-02T13:34:56.000Z",
      updatedAt: "2025-04-07T19:16:16.000Z",
    },
    {
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743617500/ReactNode/Category/kcpsdwgrihy7kh1qp1qu.jpg",
      ],
      id: "23",
      Name: "Фиолетовые цветы",
      showInMenu: true,
      showInPopular: null,
      showAfterPopular: null,
      createdAt: "2025-04-02T16:01:26.000Z",
      updatedAt: "2025-04-07T19:16:16.000Z",
    },
    {
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1745918700/ReactNode/Category/z7visnv0lpvbgqitiklp.png",
      ],
      id: "a134d28b-58c9-4177-9a25-0713aff9b5f9",
      Name: "Категория добра",
      showInMenu: true,
      showInPopular: true,
      showAfterPopular: true,
      createdAt: "2025-04-29T09:26:29.000Z",
      updatedAt: "2025-04-29T10:16:48.000Z",
    },
  ]);
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
