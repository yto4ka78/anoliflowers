import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import styles from "./productPage.module.scss";
import Gallery from "../gallery/Gallery.jsx";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice.js";
import ContactWhatsApp from "../contactWhatsApp/ContactWhatsApp.jsx";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [selectedSize, setSelectedSize] = useState("S");
  const sizeOptions = {
    S: { label: "S (стандарт)", multiplier: 1 },
    M: { label: "M (+30% цветов)", multiplier: 1.3 },
    L: { label: "L (+50% цветов)", multiplier: 1.5 },
    XL: { label: "XL (+100% цветов)", multiplier: 2 },
  };
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const basePrice = parseFloat(product?.saleprice || product?.price || 0);
  const finalPrice = Math.round(
    basePrice * sizeOptions[selectedSize].multiplier
  );
  const normalPrice = parseFloat(product?.price || 0);
  const finalnormalPrice = Math.round(
    normalPrice * sizeOptions[selectedSize].multiplier
  );
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await api.get(`main/getProduct/${id}`);
        setProduct(response.data.bouquet);
      } catch (error) {}
    };
    getProduct();
  }, []);
  if (!product) {
    return <div>Загрузка...</div>;
  }
  return (
    <div className={styles.productPage}>
      <div className={styles.productPage_mainDiv}>
        <div className={styles.header}>
          <Link to="/allCategories">Вернуться к выбору</Link>
          <div className={styles.header_text}>
            <div>Детали доставки вы можете уточнить с нашим оператором</div>
            <div>Все способы связи указаны во вкладке "Контакты"</div>
          </div>
        </div>
        <div className={styles.hr}>
          <hr />
        </div>
        <div className={styles.body}>
          <Gallery images={product.imageUrl} />
          <div className={styles.body_information}>
            <div className={styles.title_bouquet}>
              <h3>{product.name}</h3>
              <div>
                📦 Доставим: <span>в течение часа</span>
              </div>
            </div>
            <div className={styles.sizeSelector}>
              {Object.entries(sizeOptions).map(([key, option]) => (
                <button
                  key={key}
                  className={`${styles.sizeButton} ${
                    selectedSize === key ? styles.selected : ""
                  }`}
                  onClick={() => setSelectedSize(key)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className={styles.price}>
              <div className={styles.priceTitle}>Цена: </div>
              {product.saleprice ? (
                <div className={styles.saleStyles}>
                  <div className={styles.oldPrice}> {finalnormalPrice} ₸</div>
                  <div className={styles.salePrice}>{finalPrice} ₸</div>
                </div>
              ) : (
                <div className={styles.salePrice}> {finalnormalPrice} ₸</div>
              )}
            </div>
            <hr />
            <div className={styles.description}>
              <div className={styles.description_head}>Описание:</div>
              <div className={styles.description_body}>
                {product.description}
              </div>
            </div>
            <div className={styles.buttons}>
              <button
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: product.id,
                      price: product.saleprice ? finalPrice : finalnormalPrice,
                      size: selectedSize,
                    })
                  )
                }
              >
                Добавить в корзину
              </button>
              <button
                onClick={() => {
                  dispatch(
                    addToCart({
                      id: product.id,
                      price: product.saleprice ? finalPrice : finalnormalPrice,
                      size: selectedSize,
                    })
                  );
                  navigate("/basket");
                }}
              >
                Купить в один клик
              </button>
            </div>
          </div>
        </div>
        {/* Payment */}
        <div className={styles.payment}>
          <div className={styles.tab}>Оплата</div>
          <div className={styles.tab_info}>
            <div className={styles.head}>
              <div className={styles.head_text}>
                Как можно оплатить покупку?
              </div>
              <button onClick={() => setIsOpen((prev) => !prev)}>
                {isOpen ? "−" : "+"}
              </button>
            </div>

            {isOpen && (
              <div className={styles.body}>
                <p className={styles.subheading}>Наличными:</p>
                <p className={styles.paragraph}>
                  В нашем магазине по адресу: г. Алматы, ул. Радлова, 50 курьеру
                  при получении букета
                </p>
                <p className={styles.subheading}>Онлайн:</p>
                <p className={styles.paragraph}>Переводом на каспи счет</p>
                <p className={styles.paragraph}>
                  (Реквизиты уточняйте у менеджера)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Контакт */}
        <ContactWhatsApp> </ContactWhatsApp>
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

export default ProductPage;
