import React from "react";
import styles from "./contacts.module.scss";

const Contacts = () => {
  return (
    <div className={styles.contacts_mainDiv}>
      <div>
        <h3>Выберите удобный для вас способ связи с нашим менеджером!</h3>
      </div>
      <div>
        <div className={styles.whatsapp}>
          <h4>Ватсап:</h4>
          <div>+77075007006</div>
          <a
            href="https://wa.me/77075007006"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>Перейти в телеграм</button>
          </a>
        </div>
        <div>
          <h4>Инстаграм:</h4>
          <div>@flowerAstana</div>
          <a href="https://www.instagram.com/flowerastana/" target="_blank">
            <button>Перейти в инстаграм</button>
          </a>
        </div>
        <div>
          <h4>Телеграм:</h4>
          <div>@flowerAstana</div>
          <a href="https://t.me/flowerAstana" target="_blank">
            <button>Перейти в телеграм</button>
          </a>
        </div>
        <div>
          <h4>Адрес:</h4>
          <div>г. Алматы, ул. Сатпаева 29</div>
          <a href="https://2gis.kz/almaty/firm/9429940000797834/76.953608%2C43.263831?m=76.952625%2C43.262932%2F15.99">
            <button>Посмотреть на карте</button>
          </a>
        </div>
        <div>
          <h4>Телефоны:</h4>
          <div>+77714661111</div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
