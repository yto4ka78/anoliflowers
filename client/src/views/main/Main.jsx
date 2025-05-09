import Carousel from "../../UI/carousel/Carousel";
import React, { useEffect, useState } from "react";
import styles from "./main.module.scss";
import { Link } from "react-router-dom";
import CheckboxListPriceMain from "../../UI/checkbox/CheckboxListPriceMain";
import FlowerShow from "../../UI/flowerShow/FlowerShow";
import ContactWhatsApp from "../../UI/contactWhatsApp/ContactWhatsApp";
const Main = () => {
  const [flowers, setFlowers] = useState([
    {
      name: "Розы",
      price: 10000,
      saleprice: 8000,
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743609816/ReactNode/Bouquet/n0ep0ntj5ahpe2noogym.webp",
      ],
    },
    {
      name: "Тюльпаны",
      price: 9500,
      saleprice: 7500,
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743609816/ReactNode/Bouquet/n0ep0ntj5ahpe2noogym.webp",
      ],
    },
    {
      name: "Пионы",
      price: 12000,
      saleprice: 9800,
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743609816/ReactNode/Bouquet/n0ep0ntj5ahpe2noogym.webp",
      ],
    },
    {
      name: "Герберы",
      price: 8000,
      saleprice: 6500,
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743609816/ReactNode/Bouquet/n0ep0ntj5ahpe2noogym.webp",
      ],
    },
    {
      name: "Лилии",
      price: 11000,
      saleprice: 9200,
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743609816/ReactNode/Bouquet/n0ep0ntj5ahpe2noogym.webp",
      ],
    },
    {
      name: "Орхидеи",
      price: 15000,
      saleprice: 13500,
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743609816/ReactNode/Bouquet/n0ep0ntj5ahpe2noogym.webp",
      ],
    },
    {
      name: "Нарциссы",
      price: 7000,
      saleprice: 6000,
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743609816/ReactNode/Bouquet/n0ep0ntj5ahpe2noogym.webp",
      ],
    },
    {
      name: "Альстромерии",
      price: 9000,
      saleprice: 7700,
      imageUrl: [
        "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743609816/ReactNode/Bouquet/n0ep0ntj5ahpe2noogym.webp",
      ],
    },
  ]);
  const [isOpen, setIsOpen] = useState(true);
  function mixArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/main/");
        let result = await response.json();
        if (Array.isArray(result)) {
          result = mixArray(result).slice(0, 24);
        }
        setFlowers(result);
      } catch {}
    };
    fetchData();
  }, []);

  const handlePriceFilterChange = async (ranges) => {
    try {
      const response = await fetch("/api/main/");
      let result = await response.json();

      if (!Array.isArray(result)) return;

      if (ranges.length === 0) {
        const all = mixArray(result).slice(0, 24);
        setFlowers(all);
        return;
      }

      const filtered = result.filter((flower) => {
        const price = flower.saleprice || flower.price;
        return ranges.some(([min, max]) => price >= min && price <= max);
      });

      const shuffled = mixArray(filtered).slice(0, 24);
      setFlowers(shuffled);
    } catch (e) {
      console.error("Ошибка загрузки", e);
    }
  };

  return (
    <div>
      <Carousel> </Carousel>
      <div className={styles.main}>
        <div className={styles.main_priceSection}>
          <div>
            <button onClick={() => setIsOpen((prev) => !prev)}>
              ₸ Выбрать бюджет {isOpen ? "↑" : "↓"}
            </button>
          </div>
          {isOpen && (
            <div className={styles.main_priceSection_checkList}>
              <CheckboxListPriceMain
                onFilterChange={handlePriceFilterChange}
              ></CheckboxListPriceMain>
            </div>
          )}
          <div className={styles.main_priceSection_categories}>
            <a href=""> Розы 🌹</a>
            <a href=""> Пионы</a>
            <a href=""> Тюльпаны 🌷</a>
            <a href=""> Подарочные наборы</a>
            <a href=""> Клубника в шоколаде 🍓</a>
            <a href=""> Гортензии</a>
            <a href=""> Спрей розы </a>
          </div>
        </div>
      </div>

      <div className={styles.main_flowersSection}>
        <div className={styles.main_flowersSection_products}>
          {flowers &&
            flowers.map((flower, index) => (
              <FlowerShow flower={flower} index={index} key={index} />
            ))}
        </div>
        <div className={styles.showMoreflowers}>
          <button>Посмотреть еще</button>
        </div>
      </div>

      {/* КОНТАКТ */}
      <ContactWhatsApp> </ContactWhatsApp>

      <div className={styles.main_description}>
        <div className={styles.description_firstSection}>
          <div className={styles.description_firstSection_text}>
            <div>Цветы Алматы</div>
            <div>
              «Anoli Flowers» – это сеть доставки прекрасных цветов и подарков.
              Более 5 лет мы помогаем делать ваши праздники особенными. Дарите
              своим близким любовь вместе с нами.
            </div>
            <hr />
          </div>
          <div className={styles.description_firstSection_img}>
            <img src="/logo.png" alt="" />
          </div>
        </div>
        <div className={styles.description_secondSection}>
          Добро пожаловать в мир ярких эмоций и незабываемых впечатлений с Anoli
          Flowers – надежным партнером в доставке цветов и подарков по Алматы!
          Наши флористы, вдохновленные многолетним опытом и страстью к своему
          делу, творят настоящие цветочные шедевры — от нежных романтических
          композиций до роскошных праздничных букетов, которые станут
          незабываемым сюрпризом для вас и близких. Каждая композиция создается
          с особой заботой и вниманием к деталям, используя только свежайшие
          цветы, отобранные у проверенных поставщиков. Доставка цветов в Алматы
          по выгодной цене с Anoli Flowers – это гарантия свежести и красоты.
        </div>
        <h3>Доставка цветов в Алматы в любую точку города!</h3>
        <div className={styles.description_secondSection}>
          С Anoli Flowers создание идеального букета – это увлекательное
          путешествие! Мы предлагаем широкий выбор вариантов: от классических
          роз и тюльпанов до экзотических орхидей и лилий – у нас вы найдете
          варианты на любой вкус и бюджет. Вы можете выбрать готовую позицию из
          каталога, недорогой вариант со скидкой или заказать индивидуальный
          дизайн, воплотив все фантазии в жизнь. Хотите удивить любимую девушку
          романтическим сюрпризом? Или поздравить коллег с праздником? Мы
          поможем подобрать идеальные варианты. Купить цветы в Алматы онлайн —
          просто и приятно в интернет-магазине Anoli Flowers!
        </div>
        <h3>
          Наши курьеры доставят цветы в Алматы по указанному адресу и времени
        </h3>
        <div className={styles.description_secondSection}>
          Оформить заказ очень просто: выберите вариант на нашем сайте, укажите
          адрес в Алматы, способ оплаты и время. После оформления заказа с вами
          свяжется наш менеджер для подтверждения. Доставка цветов в Алматы
          осуществляется в удобное для вас время круглосуточно, без выходных.
          Срочная доставка в любой район города, на дом, в офис, в ресторан — в
          течение часа после оплаты заказа. Оплата заказа осуществляется любым
          удобным способом: банковскими картами, электронными платежными
          системами и наличными при доставке. Если же вдруг выбранный вами сорт
          растения окажется временно недоступен, менеджер свяжется с вами,
          предложив равноценную замену, максимально сохраняя задуманный стиль,
          цветовую гамму и учитывая ваш бюджет. Перед отправкой мы отправим вам
          фотографию. Конфиденциальность гарантирована: анонимная доставка
          цветов Алматы доступна по вашему запросу. Мы обеспечиваем бережную
          транспортировку растений, используя специальную упаковку и транспорт,
          защищающий композиции от повреждений. Чтобы сделать подарок еще более
          приятным, вы можете дополнить подарок съедобными композициями,
          открытками, мягкими игрушками, конфетами и другими милыми мелочами,
          представленными в нашем каталоге.
        </div>
        <h3>Цветы в Алматы по доступным ценам в любой сезон</h3>
        <div className={styles.description_secondSection}>
          Заказать великолепные цветы в нашем интернет-магазине проще простого!
          Выбирайте из огромного ассортимента свежих букетов по выгодным ценам,
          от нежных роз до ярких экзотических композиций. Мы предлагаем
          различные способы оплаты и низкие цены. Оформите быструю доставку
          прямо сейчас и подарите близким радость! Anoli Flowers – это цветы,
          которые говорят о ваших чувствах!
        </div>
        <h3>Наши цветы в Алматы с доставкой всегда в наличии!</h3>
        <div className={styles.description_secondSection}>
          В нашем магазине вы найдете цветы на заказ в Алматы на любой случай
          жизни. Яркие и жизнерадостные — для дня рождения, нежные и романтичные
          — для свидания, строгие и элегантные — для деловых встреч – мы
          предлагаем широкий выбор, который удовлетворит любой вкус и подойдет к
          любому случаю. Менеджеры помогут вам определиться, учитывая повод,
          предпочтения получателя и бюджет. Обращаем внимание на сезонность
          растений: наличие отдельных сортов может варьироваться. Актуальный
          ассортимент всегда представлен на нашем онлайн-сайте. Мы работаем
          только со свежими растениями, которые доставляются напрямую от лучших
          поставщиков. Благодаря этому, сюрприз будет радовать вас своей
          красотой в течение долгого времени. — от 7 до 14 дней. Наш ассортимент
          постоянно обновляется, чтобы вы всегда могли наслаждаться свежестью и
          красотой самых актуальных сортов. Доставка осуществляется точно в
          согласованное время, а также вы можете купить букет в Алматы без
          личного вручения – курьер оставит заказ у двери получателя. Для
          удобства выбора мы предлагаем несколько категорий: монобукеты,
          авторские букеты, цветы в коробках, цветы в корзинах, съедобные
          букеты, свадебные композиции, подарочные наборы, мужские букеты.
          Купить цветы Алматы недорого для любого события легко 24/7 в цветочном
          магазине Anoli Flowers!
        </div>
      </div>

      <div className={styles.main_someInfo}>
        <div className={styles.someInfo_centre}>
          <div className={styles.someInfo_flex}>
            <div className={styles.someInfo_image}>
              <img src="/icon_someInfo.svg" alt="" />
            </div>
            <div>
              <p className={styles.someInfo_textBold}>Гарантия свежести</p>
              <p className={styles.someInfo_textNormal}>7 дней</p>
            </div>
          </div>
          <div className={styles.someInfo_flex}>
            <div className={styles.someInfo_image}>
              {" "}
              <p>10%</p>
            </div>
            <div>
              <p className={styles.someInfo_textBold}>Скидка 10%</p>
              <p className={styles.someInfo_textNormal}>при самовывозе</p>
            </div>
          </div>
          <div className={styles.someInfo_flex}>
            <div className={styles.someInfo_image2}>
              <img src="/icon_someInfo2.png" alt="" />
            </div>
            <div>
              <p className={styles.someInfo_textNormal}>Быстрая</p>
              <p className={styles.someInfo_textBold}>оплата переводом</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.main_service_benefits}>
        <div className={styles.service_benefits}>
          <div className={styles.service_benefits_Section}>
            <div className={styles.service_benefits_img}>
              <img src="/service_benefits_firstSection.svg" alt="" />
            </div>
            <div className={styles.service_benefits_title}>
              ОТКРЫТКА К БУКЕТУ
            </div>
            <div className={styles.service_benefits_text}>
              По желанию в букет положим <strong>бесплатную открытку</strong> с
              пожеланиями получателю букета от вашего имени.
            </div>
          </div>
          <hr className={styles.vertical_line} />
          <div className={styles.service_benefits_Section}>
            <div>
              <img src="/service_benefits_secondSection.svg" alt="" />
            </div>
            <div className={styles.service_benefits_title}>ФОТООТЧЁТ</div>
            <div className={styles.service_benefits_text}>
              <strong>Фотографируем ваш букет</strong> перед отправкой, чтобы вы
              были спокойны - доставят то, что заказывали.
            </div>
          </div>
          <hr className={styles.vertical_line} />
          <div className={styles.service_benefits_Section}>
            <div>
              <img src="/service_benefits_thirdSection.svg" alt="" />
            </div>
            <div className={styles.service_benefits_title}>
              СМС-ИНФОРМИРОВАНИЕ
            </div>
            <div className={styles.service_benefits_text}>
              <strong>Информируем</strong> обо всех этапах доставки: когда
              подарок собран, когда доставляется и когда доставлен.
            </div>
          </div>
          <hr className={styles.vertical_line} />
          <div className={styles.service_benefits_Section}>
            <div>
              <img src="/service_benefits_fourthSection.svg" alt="" />
            </div>
            <div className={styles.service_benefits_title}>ВИДЕООТЧЁТ</div>
            <div className={styles.service_benefits_text}>
              <strong>Записываем на видео эмоции</strong> счастливого получателя
              вашего подарка
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
