import React from "react";
import { Link } from "react-router-dom";
import insta_logo from "../../assets/images/instagram_logo.png";
import vk_logo from "../../assets/images/vk_logo.png";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer_maindiv}>
      <div className={styles.footer_maindiv_top}>
        <div className={styles.footer_maindiv_firstcolumn}>
          <div>Часы работы:</div>
          <div>С 8:00 до 17:00. Выходные суббота и воскресенье</div>
        </div>
        <div className={styles.footer_maindiv_secondcolumn}>
          <div>Контакты:</div>
          <div>+77714661111</div>
          <div>erik.sitnikov.fr@gmail.com</div>
          <div>Город: Астана</div>
          <div>Адрес: Пелегримова 52</div>
        </div>
        <div className={styles.footer_maindiv_thirdcolumn}>
          <div>Социальные сети:</div>
          <div>
            <a href="">
              <img src={insta_logo} alt="" />
            </a>
            <a href="">
              <img src={vk_logo} alt="" />
            </a>
          </div>
        </div>
      </div>
      <hr style={{ margin: "0px", border: "1px solid white" }} />
      <div className={styles.footer_maindiv_bot}>
        <a href="/">© {new Date().getFullYear()}</a>
        <a href="/confidentiality">Политика конфиденциальнсоти</a>
        <a href="/cookie">Управление куки</a>
      </div>
    </div>
  );
};

export default Footer;
