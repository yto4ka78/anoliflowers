import React from "react";
import styles from "./Delivery.module.scss";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";

const Delivery = () => {
  const center = [43.238949, 76.889709];
  return (
    <div className={styles.delivery}>
      <div className={styles.title}>Стоимость доставки по зонам</div>
      <div className={styles.head}>
        <div className={styles.head_leftPart}>
          <div className={styles.title_leftPart}>
            Воспользуйтесь кнопкой «найти», чтобы ввести адрес и узнать
            стоимость доставки.
          </div>
          <div className={styles.textContainer_leftPart}>
            <div className={styles.p1}>
              Стоимость доставки по зонам Алматинской области
            </div>
            <div>
              <span className={styles.map_green}>●</span>Стоимость доставки 2500
              ₸
            </div>
            <div>
              <span className={styles.map_red}>●</span>Стоимость доставки 3000 ₸
            </div>
            <div>
              <span className={styles.map_blue}>●</span>Стоимость доставки 4000
              ₸
            </div>
          </div>
        </div>
        <div className={styles.head_rightpart}>
          <MapContainer
            center={center}
            zoom={11}
            style={{ height: "500px", width: "100%", margin: "20px 0px" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Зелёная зона */}
            <Circle
              center={center}
              radius={3000}
              pathOptions={{ color: "green", fillOpacity: 0.3 }}
            >
              <Popup>Зона 1: Бесплатная доставка</Popup>
            </Circle>

            {/* Красная зона */}
            <Circle
              center={center}
              radius={6000}
              pathOptions={{ color: "red", fillOpacity: 0.2 }}
            >
              <Popup>Зона 2: 1000 ₸</Popup>
            </Circle>

            {/* Синяя зона */}
            <Circle
              center={center}
              radius={10000}
              pathOptions={{ color: "blue", fillOpacity: 0.1 }}
            >
              <Popup>Зона 3: 2000 ₸</Popup>
            </Circle>
          </MapContainer>
        </div>
      </div>
      <div className={styles.seconde_container}>
        <div className={styles.seconde_container_left_part}>
          <div className={styles.seconde_containerTitle}>Доставка</div>
          <hr />
          <div className={styles.seconde_container_p1}>
            Сколько по времени доставляется?
          </div>
          <div className={styles.seconde_container_p2}>
            Зависит от размера букета и расстояния до получателя. <br />
            <br />
            Среднее время доставки — 60 минут. Точную информацию уточняйте по
            телефону: <br />
            <br />s Курьер будет ожидать 15 минут на месте в случае отсутствия
            получателя.
          </div>
          <hr />
        </div>
        <div className={styles.seconde_container_right_part}>
          <div className={styles.seconde_containerTitle}>Оплата</div>
          <hr />
          <div className={styles.seconde_container_p1}>
            Как можно оплатить покупку?
          </div>
          <div className={styles.seconde_container_p2}>
            <span>Наличными:</span> <br />
            <br />
            в нашем магазине по адресу: 050010 г. Алматы, Медеуский район, ул.
            Радлова, д. 50/40 <br />
            <br />
            курьеру при получении букета <br />
            <br />
            <span>Перевод на карту:</span> <br />
            <br />
            реквизиты уточняйте у менеджера
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Delivery;
