import React, { useState } from "react";
import styles from "./ContactWhatsApp.module.scss";
import {
  generateMessagePhoneContact,
  sendTelegramMessage,
} from "../../utils/messageSender";

const ContactWhatsApp = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorPhone, setErrorPhone] = useState(false);
  const [phonesended, setPhoneSended] = useState(false);
  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
    if (errorPhone) setErrorPhone(false);
  };

  const sendMessage = () => {
    if (!phoneNumber) {
      setErrorPhone(true);
    } else {
      const message = generateMessagePhoneContact(phoneNumber);
      sendTelegramMessage(message);
      setPhoneSended(true);
    }
  };

  return (
    <div className={styles.main_contact_width}>
      <div className={styles.contact_firstSection}>
        <div>Оставьте заявку и мы соберем для вас идеальный букет</div>
        <div>Заполните форму и мы свяжемся с Вами в ближайшее время.</div>
      </div>
      <div className={styles.contact_secondSection}>
        <div className={styles.contact_secondSection_input}>
          <input
            type="tel"
            onChange={handleChangePhoneNumber}
            value={phoneNumber}
            placeholder="+7 (ˍˍˍ) ˍˍˍ ˍˍ ˍˍ"
          />
          <img src="icon_phone.png" alt="" />
          {errorPhone && (
            <div className={styles.error_phone}>Неправильно введен номер</div>
          )}
        </div>
        {phonesended ? (
          <div className={styles.phoneSended}>
            Заявка отправлена, менеджер свяжется с вами
          </div>
        ) : (
          <button
            onClick={() => {
              sendMessage();
            }}
          >
            Отправить заявку
          </button>
        )}

        <div className={styles.contact_secondSection_checkbox}>
          <label className={styles.custom_checkbox}>
            <input type="checkbox" defaultChecked />
            <span className={styles.checkmark}></span>
          </label>
          <div>
            Нажимая на кнопку, вы даёте согласие на обработку персональных
            данных
          </div>
        </div>
      </div>
      <div className={styles.contact_thirdSection}>
        <img src="/womanManager.webp" alt="" />
        <div>Менеджер перезвонит вам, чтобы уточнить удобное время</div>
      </div>
    </div>
  );
};

export default ContactWhatsApp;
