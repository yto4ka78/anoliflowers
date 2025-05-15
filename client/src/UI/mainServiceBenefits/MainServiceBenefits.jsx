import React from "react";
import styles from "./MainServiceBenefits.module.scss";

const MainServiceBenefits = () => {
  return (
    <div className={styles.main_service_benefits}>
      <div className={styles.service_benefits}>
        <div className={styles.service_benefits_Section}>
          <div className={styles.service_benefits_img}>
            <img src="/service_benefits_firstSection.png" alt="" />
          </div>
          <div className={styles.service_benefits_title}>ОТКРЫТКА К БУКЕТУ</div>
          <div className={styles.service_benefits_text}>
            По желанию в букет положим <strong>бесплатную открытку</strong> с
            пожеланиями получателю букета от вашего имени.
          </div>
        </div>
        <hr className={styles.vertical_line} />
        <div className={styles.service_benefits_Section}>
          <div className={styles.service_benefits_img}>
            <img src="/service_benefits_secondSection.png" alt="" />
          </div>
          <div className={styles.service_benefits_title}>ФОТООТЧЁТ</div>
          <div className={styles.service_benefits_text}>
            <strong>Фотографируем ваш букет</strong> перед отправкой, чтобы вы
            были спокойны - доставят то, что заказывали.
          </div>
        </div>
        <hr className={styles.vertical_line} />
        <div className={styles.service_benefits_Section}>
          <div className={styles.service_benefits_img}>
            <img src="/service_benefits_thirdSection.png" alt="" />
          </div>
          <div className={styles.service_benefits_title}>
            СМС-ИНФОРМИРОВАНИЕ
          </div>
          <div className={styles.service_benefits_text}>
            <strong>Информируем</strong> обо всех этапах доставки: когда подарок
            собран, когда доставляется и когда доставлен.
          </div>
        </div>
        <hr className={styles.vertical_line} />
        <div className={styles.service_benefits_Section}>
          <div className={styles.service_benefits_img}>
            <img src="/service_benefits_fourthSection.png" alt="" />
          </div>
          <div className={styles.service_benefits_title}>ВИДЕООТЧЁТ</div>
          <div className={styles.service_benefits_text}>
            <strong>Записываем на видео эмоции</strong> счастливого получателя
            вашего подарка
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainServiceBenefits;
