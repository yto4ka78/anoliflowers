import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./profileOrders.module.scss";
import userHasRole from "../../utils/userRole";
import ReactPaginate from "react-paginate";
import api from "../../utils/api";

const ProfileOrders = ({ setActiveProfileView, setSelectedOrder }) => {
  const [orders, setOrders] = useState([]);

  const itemsPerPage = 30;
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil((orders?.length || 0) / itemsPerPage);
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
  const offset = currentPage * itemsPerPage;
  const currentItems = Array.isArray(orders)
    ? orders.slice(offset, offset + itemsPerPage)
    : [];
  useEffect(() => {
    const handleGetOrders = async () => {
      try {
        const response = await api.get("/order/getordersuser");
        setOrders(response.data.orders);
      } catch (error) {}
    };
    handleGetOrders();
  }, []);
  return (
    <div className={styles.profileOrders_main}>
      <div className={styles.profileOrders_header}>
        <span className={styles.profileOrders_column}>Цена</span>
        <span className={styles.profileOrders_column}>Дата заказа</span>
        <span className={styles.profileOrders_column}>Адрес</span>
        <span className={styles.profileOrders_column}> Номер телефона</span>
        <span className={styles.profileOrders_column}></span>
      </div>
      <div className={styles.profileOrders_body}>
        {currentItems.length > 0 ? (
          currentItems.map((order) => (
            <div className={styles.profileOrders_order}>
              <span className={styles.profileOrders_column}>
                {order.totalPrice}
              </span>
              <span className={styles.profileOrders_column}>
                {new Date(order.createdAt).toLocaleDateString("ru-RU")}
              </span>
              <span className={styles.profileOrders_column}>
                {order.address}
              </span>
              <span className={styles.profileOrders_column}>
                {order.sendernumberphone}
              </span>
              <button
                className={styles.profileOrders_column}
                onClick={() => {
                  setActiveProfileView("profileOrderDetail");
                  setSelectedOrder(order);
                }}
              >
                Подробно
              </button>
            </div>
          ))
        ) : (
          <div>
            <div>У вас на данный момент нету заказов</div>
            <div>
              Если вы оплатили заказ и не видете его тут, значит менеджер еще не
              изменил статус заказа.{" "}
            </div>
          </div>
        )}
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

export default ProfileOrders;
