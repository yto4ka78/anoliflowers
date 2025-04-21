import React from "react";
import styles from "./contacts.module.scss";
import {
  FaWhatsapp,
  FaInstagram,
  FaTelegramPlane,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

const Contacts = () => {
  return (
    <div className={styles.contacts_mainDiv}>
      <div className={styles.contacts_header}>
        <h3>Свяжитесь с нами удобным способом!</h3>
        <p>Мы всегда на связи и с радостью поможем вам с выбором букета 🌸</p>
      </div>

      <div className={styles.contacts_list}>
        <div className={styles.contact_item}>
          <h4>
            <FaWhatsapp /> WhatsApp
          </h4>
          <div>+77075007006</div>
          <a
            href="https://wa.me/77075007006"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>Открыть WhatsApp</button>
          </a>
        </div>

        <div className={styles.contact_item}>
          <h4>
            <FaInstagram /> Instagram
          </h4>
          <div>@flowerAstana</div>
          <a href="https://www.instagram.com/flowerastana/" target="_blank">
            <button>Перейти в Instagram</button>
          </a>
        </div>

        <div className={styles.contact_item}>
          <h4>
            <FaTelegramPlane /> Telegram
          </h4>
          <div>@flowerAstana</div>
          <a href="https://t.me/flowerAstana" target="_blank">
            <button>Открыть Telegram</button>
          </a>
        </div>

        <div className={styles.contact_item}>
          <h4>
            <FaMapMarkerAlt /> Адрес
          </h4>
          <div>г. Алматы, ул. Сатпаева 29</div>
          <a href="https://2gis.kz/almaty/firm/9429940000797834/76.953608%2C43.263831?m=76.952625%2C43.262932%2F15.99">
            <button>Посмотреть на карте</button>
          </a>
        </div>

        <div className={styles.contact_item}>
          <h4>
            <FaPhoneAlt /> Телефоны
          </h4>
          <div>++77075007006</div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
