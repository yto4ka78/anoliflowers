import React from "react";
import styles from "./Carousel.module.scss";
import WhatsAppIconWhite from "../icons/WhatsAppIconWhite";

const Carousel = () => {
  return (
    <div className={styles.main_carousel}>
      <div className={styles.main_carousel_info}>
        <div className={styles.firstdiv}>Доставка цветов Алматы</div>
        <div className={styles.seconddiv}>
          Закажите букет от 9990 тг. с доставкой от 40 минут и фотоотчетом перед
          отправкой цветов.
        </div>
        <a href="">
          <WhatsAppIconWhite> </WhatsAppIconWhite> ПЕРЕЙТИ В ЧАТ
        </a>
        <div className={styles.thirddiv}>
          <div className={styles.thirddiv_relative}>
            <div>
              <img src="/main_1.png" alt="" />
            </div>
            <div>
              Гарантия свежести <br /> цветов!
            </div>
          </div>
          <div className={styles.thirddiv_relative}>
            <div>
              <img src="/main_2.png" alt="" />
            </div>
            <div>
              Фото букета перед <br /> отправкой
            </div>
          </div>
          <div className={styles.thirddiv_relative}>
            <div>
              <img src="/main_3.webp" alt="" />
            </div>
            <div>Рассрочка 0-0-3</div>
          </div>
        </div>
      </div>
      <div className={styles.main_carousel_title}>
        <img src="/mainPhoto.png" alt="" />
      </div>
    </div>
  );
};

export default Carousel;
