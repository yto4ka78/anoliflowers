import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "./PaginatedCategories.module.scss";
import { Link } from "react-router-dom";

const PaginatedCategories = ({ allBouquets }) => {
  const itemsPerPage = 12;
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
        {currentItems.map((bouquet) => (
          <div key={bouquet.id} className={styles.allPagination_element}>
            <Link to={`/product_page/${bouquet.id}`} state={{ id: bouquet.id }}>
              <img src={bouquet.imageUrl[0]} alt={bouquet.Name} />
            </Link>
            <div className={styles.allPagination_elementFlex}>
              <div>{bouquet.name}</div>
              <div>{bouquet.price} тенге</div>
              <Link
                to={`/product_page/${bouquet.id}`}
                state={{ id: bouquet.id }}
              >
                <button>Посмотреть</button>
              </Link>
            </div>
          </div>
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
