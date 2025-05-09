import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import styles from "./categorySpecial.module.scss";
import PaginatedCategories from "../../UI/pagination/PaginatedCategories";
import { useParams } from "react-router-dom";

const CategorySpecial = () => {
  const { id } = useParams();
  const [nameCategory, setNameCategory] = useState("Розы");
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
