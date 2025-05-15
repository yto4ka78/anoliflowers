import React, { useEffect, useState } from "react";
import styles from "./MapSite.module.scss";
import axios from "axios";
import { Link } from "react-router-dom";

const MapSite = () => {
  const [categories, setCategories] = useState();
  useEffect(() => {
    const handleCategories = async () => {
      try {
        const response = await axios.get("/api/main/mapSite");
        const sortedCategories = response.data.categories.sort((a, b) =>
          a.Name.localeCompare(b.Name)
        );
        setCategories(sortedCategories);
      } catch {}
    };
    handleCategories();
  }, []);
  return (
    <div className={styles.mapSite_container}>
      {categories &&
        categories.map((category) => (
          <Link to={`/category/${category.id}`} className={styles.category}>
            <div> {category.Name} </div>
          </Link>
        ))}
    </div>
  );
};

export default MapSite;
