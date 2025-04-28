import React, { useState } from "react";
import styles from "./ordersRoot.module.scss";
import ReactPaginate from "react-paginate";

const OrdersRoot = ({ setActiveView }) => {
  const [allOrders, setAllOrders] = useState([
    {
      id: 1,
      name: "Саша",
      price: 20000,
      date: "20.04.2024",
      address: "Пугкина 28",
      phone: "+77714661111",
    },
    {
      id: 2,
      name: "Саша",
      price: 20000,
      date: "20.04.2024",
      address: "Пугкина 28",
      phone: "+77714661111",
    },
  ]);

  const itemsPerPage = 24;
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil((allOrders?.length || 0) / itemsPerPage);
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
  const offset = currentPage * itemsPerPage;
  const currentItems = (allOrders || []).slice(offset, offset + itemsPerPage);

  return (
    <div>
      <div className={styles.orderRoot_header}>
        <span className={styles.orderRoot_column}>Получатель</span>
        <span className={styles.orderRoot_column}>Цена</span>
        <span className={styles.orderRoot_column}>Дата заказа</span>
        <span className={styles.orderRoot_column}>Адрес</span>
        <span className={styles.orderRoot_column}>Номер телефона</span>
        <span className={styles.orderRoot_column}></span>
      </div>
      <div className={styles.orderRoot_body}>
        <div className={styles.orderRoot_order}>
          <span className={styles.orderRoot_column}>Саша</span>
          <span className={styles.orderRoot_column}>20000</span>
          <span className={styles.orderRoot_column}>20.04.2024</span>
          <span className={styles.orderRoot_column}>Пугкина 28</span>
          <span className={styles.orderRoot_column}>+77714661111</span>
          <button
            className={styles.orderRoot_column}
            onClick={() => setActiveView("OrderRootDetail")}
          >
            Подробно
          </button>
        </div>
        <div className={styles.orderRoot_order}>
          <span className={styles.orderRoot_column}>Саша</span>
          <span className={styles.orderRoot_column}>20000</span>
          <span className={styles.orderRoot_column}>20.04.2024</span>
          <span className={styles.orderRoot_column}>Пугкина 28</span>
          <span className={styles.orderRoot_column}>+77714661111</span>
          <button className={styles.orderRoot_column}>Подробно</button>
        </div>
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

export default OrdersRoot;
