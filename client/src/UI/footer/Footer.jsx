import React from "react";
import { Link } from "react-router-dom";
import insta_logo from "../../assets/images/instagram_logo.png";
import vk_logo from "../../assets/images/vk_logo.png";
import styles from "./Footer.module.scss";
import WhatsAppIcon from "../navbar/WhatsAppIcon.jsx";
import InstagramIcon from "../navbar/InstagramIcon.jsx";

const Footer = () => {
  return (
    <div className={styles.footer_maindiv}>
      <div className={styles.NavBar_Main_size2}>
        <div className={styles.NavBar_Main_Section2}>
          <div className={styles.navLinks_menu}>
            <img src="/logo.png" alt="" />
          </div>

          <div className={styles.navLinks__categories}>
            <div>
              <Link to="">Каталог</Link>
            </div>
            <div>
              <Link to="">Розы</Link>
            </div>
            <div>
              <Link to="">Пионы</Link>
            </div>
            <div>
              <Link to="">Съедобные</Link>
            </div>
            <div>
              <Link to="">В коробке</Link>
            </div>
            <div>
              <Link to="">Тюльпаны</Link>
            </div>
            <div>
              <Link to="">Пионы</Link>
            </div>
            <div>
              <Link to="/contacts">Контакты</Link>
            </div>
            <div>
              <Link to="/delivery">Доставка</Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer_maindiv_secondsection_size}>
        <div className={styles.footer_maindiv_secondsection}>
          <div className={styles.left_side}>
            <a href="">Карта сайта</a>
            <a href="">Наверх</a>
          </div>
          <div className={styles.right_side}>
            <div>+337-80-33-54-90</div>
            <div>
              <WhatsAppIcon></WhatsAppIcon>
            </div>
            <div>
              <InstagramIcon></InstagramIcon>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Footer;
