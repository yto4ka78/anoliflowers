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
import MainServiceBenefits from "../mainServiceBenefits/MainServiceBenefits.jsx";
import SomeInfo from "../someInfo/SomeInfo.jsx";

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
  }, [id]);
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

      <SomeInfo></SomeInfo>

      <MainServiceBenefits></MainServiceBenefits>
    </div>
  );
};

export default ProductPage;
