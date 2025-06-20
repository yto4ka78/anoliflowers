import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "./PaginatedCategories.module.scss";
import { Link } from "react-router-dom";
import FlowerShow from "../flowerShow/FlowerShow";

const PaginatedCategories = ({ allBouquets }) => {
  const itemsPerPage = 24;
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil((allBouquets?.length || 0) / itemsPerPage);
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
  const offset = currentPage * itemsPerPage;
  const currentItems = (allBouquets || []).slice(offset, offset + itemsPerPage);

  return (
    <div>
      <div className={styles.allPagination_list}>
        {currentItems.map((flower, index) => (
          <FlowerShow flower={flower} index={index} key={index} />
        ))}
      </div>

      <ReactPaginate
        previousLabel={"← Назад"}
        nextLabel={"Вперёд →"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
      />
    </div>
  );
};

export default PaginatedCategories;
