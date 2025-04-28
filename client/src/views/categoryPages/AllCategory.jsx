import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { Link } from "react-router-dom";
import styles from "./allcategory.module.scss";

import PaginatedCategories from "../../UI/pagination/PaginatedCategories";

const AllCategory = () => {
  const [pupularCategories, setpupularCategories] = useState([
    {
      name: "Розы",
      price: 10000,
      saleprice: 8000,
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743609816/ReactNode/Bouquet/n0ep0ntj5ahpe2noogym.webp",
      ],
    },
    {
      name: "Тюльпаны",
      price: 9500,
      saleprice: 7500,
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743609816/ReactNode/Bouquet/n0ep0ntj5ahpe2noogym.webp",
      ],
    },
    {
      name: "Пионы",
      price: 12000,
      saleprice: 9800,
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743609816/ReactNode/Bouquet/n0ep0ntj5ahpe2noogym.webp",
      ],
    },
    {
      name: "Герберы",
      price: 8000,
      saleprice: 6500,
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743609816/ReactNode/Bouquet/n0ep0ntj5ahpe2noogym.webp",
      ],
    },
    {
      name: "Лилии",
      price: 11000,
      saleprice: 9200,
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743609816/ReactNode/Bouquet/n0ep0ntj5ahpe2noogym.webp",
      ],
    },
    {
      name: "Орхидеи",
      price: 15000,
      saleprice: 13500,
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743609816/ReactNode/Bouquet/n0ep0ntj5ahpe2noogym.webp",
      ],
    },
    {
      name: "Нарциссы",
      price: 7000,
      saleprice: 6000,
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743609816/ReactNode/Bouquet/n0ep0ntj5ahpe2noogym.webp",
      ],
    },
    {
      name: "Альстромерии",
      price: 9000,
      saleprice: 7700,
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743609816/ReactNode/Bouquet/n0ep0ntj5ahpe2noogym.webp",
      ],
    },
  ]);
  const [categorySelected, setCategorySelected] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [allBouquets, setAllBouquets] = useState([
    {
      name: "Розы",
      price: 10000,
      saleprice: 8000,
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743609816/ReactNode/Bouquet/n0ep0ntj5ahpe2noogym.webp",
      ],
    },
    {
      name: "Тюльпаны",
      price: 9500,
      saleprice: 7500,
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743609816/ReactNode/Bouquet/n0ep0ntj5ahpe2noogym.webp",
      ],
    },
    {
      name: "Пионы",
      price: 12000,
      saleprice: 9800,
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743609816/ReactNode/Bouquet/n0ep0ntj5ahpe2noogym.webp",
      ],
    },
    {
      name: "Герберы",
      price: 8000,
      saleprice: 6500,
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743609816/ReactNode/Bouquet/n0ep0ntj5ahpe2noogym.webp",
      ],
    },
    {
      name: "Лилии",
      price: 11000,
      saleprice: 9200,
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743609816/ReactNode/Bouquet/n0ep0ntj5ahpe2noogym.webp",
      ],
    },
    {
      name: "Орхидеи",
      price: 15000,
      saleprice: 13500,
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743609816/ReactNode/Bouquet/n0ep0ntj5ahpe2noogym.webp",
      ],
    },
    {
      name: "Нарциссы",
      price: 7000,
      saleprice: 6000,
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743609816/ReactNode/Bouquet/n0ep0ntj5ahpe2noogym.webp",
      ],
    },
    {
      name: "Альстромерии",
      price: 9000,
      saleprice: 7700,
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743609816/ReactNode/Bouquet/n0ep0ntj5ahpe2noogym.webp",
      ],
    },
  ]);
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
        <h2>Популярные категории</h2>
      </div>
      <div className={styles.allCategories_list}>
        {Array.isArray(pupularCategories) &&
          pupularCategories.map((category) => (
            <div key={category.id} className={styles.allCategories_category}>
              <Link to={`/category/${category.id}`} state={{ id: category.id }}>
                <div>
                  <img src={category.imageUrl[0]} alt={category.Name} />
                </div>
                <div className={styles.category_title}>
                  <div>{category.Name}Белые розы Белые розы</div>
                </div>
              </Link>
            </div>
          ))}
      </div>
      <div className={styles.allCategories_TextHeader}>
        <h2>Другие категории</h2>
      </div>
      <div className={styles.allCategories_list}>
        {Array.isArray(pupularCategories) &&
          pupularCategories.map((category) => (
            <div key={category.id} className={styles.allCategories_category}>
              <Link to={`/category/${category.id}`} state={{ id: category.id }}>
                <div>
                  <img src={category.imageUrl[0]} alt={category.Name} />
                </div>
                <div className={styles.category_title}>
                  <div>{category.Name}Белые розы Белые розы</div>
                </div>
              </Link>
            </div>
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
