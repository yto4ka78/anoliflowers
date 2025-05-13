import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ProfileOrdersDetail.module.scss";
import userHasRole from "../../utils/userRole";
import api from "../../utils/api";

const ProfileOrdersDetail = ({ setActiveView, order }) => {
  const orderDetails = [
    { label: "Email заказчика", value: order?.emailuser || "Не указано" },
    {
      label: "Имя заказчика",
      value: order?.totalPrice ? `${order.sendername} ₸` : "Не указано",
    },
    {
      label: "Фамилия заказчика",
      value: order?.totalPrice ? `${order.senderfamilyname} ₸` : "Не указано",
    },
    {
      label: "Номер телефона заказчика",
      value: order?.sendernumberphone || "Не указано",
    },
    {
      label: "Имя получателя",
      value: order?.totalPrice ? `${order.recipientname} ₸` : "Не указано",
    },
    {
      label: "Телефон получателя",
      value: order?.totalPrice
        ? `${order.recipientnumberphone} ₸`
        : "Не указано",
    },
    {
      label: "Цена",
      value: order?.totalPrice ? `${order.totalPrice} ₸` : "Не указано",
    },
    {
      label: "Букеты",
      value: Array.isArray(order?.bouquets)
        ? order.bouquets
            .map(
              (b) => `${b.name} — ${b.quantity} шт. (${b.size}) — ${b.total} ₸`
            )
            .join("\n")
        : "—",
    },
    { label: "Дополнение к заказу", value: order?.comments || "Не указано" },
    {
      label: "Дата заказа",
      value: order?.createdAt
        ? new Date(order.createdAt).toLocaleDateString("ru-RU")
        : "—",
    },
    { label: "Адрес", value: order?.address || "Самовывоз" },
    {
      label: "Статус",
      value:
        order?.status === "confirmed"
          ? "Подтверждён"
          : order?.status === "pending"
          ? "Ожидает"
          : "—",
    },
  ];
  const [statusOrder, setStatusOrder] = useState(order.status);

  return (
    <div className={styles.orderRootDetail_main}>
      <div className={styles.orderRootDetail_container}>
        {orderDetails.map((item, index) => (
          <div key={index} className={styles.orderRootDetail_row}>
            <p className={styles.orderRootDetail_label}>{item.label}</p>
            <p className={styles.orderRootDetail_value}>{item.value}</p>
          </div>
        ))}
        {statusOrder === "pending" ? (
          <div className={styles.orderDetails_buttons}>
            Заказ не Подтверждён
          </div>
        ) : (
          <div className={styles.orderConfirmed_text}>✅ Заказ Подтверждён</div>
        )}
      </div>
    </div>
  );
};

export default ProfileOrdersDetail;
