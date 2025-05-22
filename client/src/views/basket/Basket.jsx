import React, { useState, useRef, useEffect, useMemo } from "react";
import styles from "./Basket.module.scss";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Cookies from "js-cookie";
import api from "../../utils/api";
import {
  handleOrderCreationAndGenerateMessage,
  sendTelegramMessage,
} from "../../utils/messageSender";
import { validateFormData } from "./formDataValid";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/cartSlice";
const Basket = () => {
  const center = [43.238949, 76.889709];
  const orderInfoRef = useRef(null);
  const [hideButton, setHideButton] = useState(false);
  const hideButtonRef = useRef(false);
  const [basketItems, setBasketItems] = useState([]);
  const [isSelfRecipient, setIsSelfRecipient] = useState(false);
  const [selectedZone, setSelectedZone] = useState("pickup");
  const [formData, setFormData] = useState({
    bouquets: [],
    anonymously: false,
    isSelfRecipient: false,
    senderName: "",
    senderPhone: "",
    recipientName: "",
    recipientPhone: "",
    deliveryZone: "pickup",
    address: "",
    comment: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [formDataValide, setFormDataValide] = useState(false);
  const dispatch = useDispatch();
  const zoneDelivery = {
    pickup: { price: 0 },
    zone1: { price: 2500 },
    zone2: { price: 3000 },
    zone3: { price: 4000 },
  };
  const sizeOptions = {
    S: { label: "S", multiplier: 1 },
    M: { label: "M (+30%)", multiplier: 1.3 },
    L: { label: "L (+50%)", multiplier: 1.5 },
    XL: { label: "XL (+100%)", multiplier: 2 },
  };
  const [anonymously, setAnonymously] = useState(false);
  const handleClickAnonymously = () => {
    setAnonymously((prev) => {
      const newValue = !prev;
      setFormData((prevForm) => ({
        ...prevForm,
        anonymously: newValue,
      }));
      return newValue;
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [cart, setCart] = useState(() =>
    JSON.parse(Cookies.get("cart") || "[]")
  );

  useEffect(() => {
    const handleBasket = async () => {
      try {
        const ids = cart.map((item) => item.id);
        if (ids.length === 0) {
          window.location.href = "localhost:5000";
        }
        const response = await api.post("/basket/getproduct", { ids });
        setBasketItems(response.data.bouquets);
      } catch {}
    };
    handleBasket();
  }, [cart]);

  const updateSize = (id, oldSize, newSize) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.size === oldSize) {
        return { ...item, size: newSize };
      }
      return item;
    });

    setCart(updatedCart);
    Cookies.set("cart", JSON.stringify(updatedCart), { expires: 1 });
  };

  const updateQuantity = (id, size, delta) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.size === size) {
        return {
          ...item,
          quantity: Math.max(item.quantity + delta, 1),
        };
      }
      return item;
    });

    setCart(updatedCart);
    Cookies.set("cart", JSON.stringify(updatedCart), { expires: 1 });
  };
  const deleteItemFromCart = (id, size) => {
    const updatedCart = cart.filter(
      (item) => !(item.id === id && item.size === size)
    );

    setCart(updatedCart);
    Cookies.set("cart", JSON.stringify(updatedCart), { expires: 1 });
  };
  const basketWithDetails = useMemo(() => {
    const sizeOptions = {
      S: { label: "S", multiplier: 1 },
      M: { label: "M (+30%)", multiplier: 1.3 },
      L: { label: "L (+50%)", multiplier: 1.5 },
      XL: { label: "XL (+100%)", multiplier: 2 },
    };
    return cart.map((item) => {
      const bouquet = basketItems.find((b) => b.id === item.id);
      if (!bouquet) return item;

      const multiplier = sizeOptions[item.size]?.multiplier || 1;
      const basePrice = parseFloat(bouquet.price || 0);
      const salePrice = bouquet.saleprice
        ? parseFloat(bouquet.saleprice)
        : null;
      const finalBasePrice = Math.round(basePrice * multiplier);
      const finalSalePrice = salePrice
        ? Math.round(salePrice * multiplier)
        : null;
      const finalPrice = finalSalePrice ?? finalBasePrice;

      return {
        ...item,
        name: bouquet.name,
        imageUrl: bouquet.imageUrl,
        finalBasePrice,
        finalSalePrice,
        finalPrice,
        total: finalPrice * item.quantity,
      };
    });
  }, [cart, basketItems]);

  const handleOrderSubmit = () => {
    const errors = validateFormData(formData);
    if (errors.length > 0) {
      setFormDataValide(false);
      setErrorMessage(errors);
    } else {
      setFormDataValide(true);
      setErrorMessage();
      const message = handleOrderCreationAndGenerateMessage(formData);
      sendTelegramMessage(message);
      dispatch(clearCart());
    }
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      bouquets: basketWithDetails,
    }));
  }, [basketWithDetails]);

  const totalSum = basketWithDetails.reduce((sum, item) => sum + item.total, 0);
  const totalProductCount = basketWithDetails.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const deliveryPrice = zoneDelivery[selectedZone]?.price || 0;
  const totalWithDelivery = totalSum + deliveryPrice;

  useEffect(() => {
    let currentY = 0;
    const animate = () => {
      const targetY = window.scrollY + 100;
      currentY += (targetY - currentY) * 0.1;
      if (orderInfoRef.current) {
        orderInfoRef.current.style.transform = `translateY(${currentY}px)`;
      }
      if (window.scrollY > 1200 && !hideButtonRef.current) {
        hideButtonRef.current = true;
        setHideButton(true);
      } else if (window.scrollY <= 1200 && hideButtonRef.current) {
        hideButtonRef.current = false;
        setHideButton(false);
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.leftPart}>
        <div className={styles.headTitle}>
          <h2>Корзина</h2>
          <hr />
        </div>
        <div>
          {basketWithDetails.length === 0 ? (
            <div className={styles.lackOfBouquets}>
              {" "}
              Вы не добавили ни одного букета{" "}
            </div>
          ) : (
            basketWithDetails.map((bouquet) => (
              <div>
                <div className={styles.bouquet}>
                  <div className={styles.bouquetImg}>
                    <img src={bouquet.imageUrl?.[0]} alt="Фото" />
                  </div>
                  <div className={styles.bouquetDescription}>
                    <div className={styles.name}>{bouquet.name}</div>
                    <div className={styles.size}>кол-во: {bouquet.size}</div>
                    <div className={styles.sizeSelector}>
                      {Object.entries(sizeOptions).map(([key, option]) => (
                        <button
                          key={key}
                          className={`${styles.sizeButton} ${
                            bouquet.size === key ? styles.selected : ""
                          }`}
                          onClick={() =>
                            updateSize(bouquet.id, bouquet.size, key)
                          }
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>

                    {bouquet.finalSalePrice ? (
                      <div>
                        <div className={styles.price_container}>
                          <div className={styles.salePrice}>
                            {bouquet.finalSalePrice} ₸
                          </div>
                          <div className={styles.price}>
                            {bouquet.finalBasePrice} ₸
                          </div>
                        </div>{" "}
                      </div>
                    ) : (
                      <div className={styles.price_container}>
                        <div className={styles.salePrice}>
                          {bouquet.finalBasePrice} ₸
                        </div>{" "}
                      </div>
                    )}
                  </div>
                  <div className={styles.flex}></div>
                  <div className={styles.quantity}>
                    <div className={styles.quantitySelector}>
                      <button
                        onClick={() =>
                          updateQuantity(bouquet.id, bouquet.size, -1)
                        }
                      >
                        −
                      </button>
                      <span>{bouquet.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(bouquet.id, bouquet.size, 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className={styles.deleteButton_div}>
                    <div className={styles.deleteButton}>
                      <button
                        onClick={() =>
                          deleteItemFromCart(bouquet.id, bouquet.size)
                        }
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            ))
          )}
        </div>
        {/* Корзина Для телефона */}
        <div className={styles.orderInfo_phone}>
          <div className={styles.orderTitle}>Ваш заказ</div>
          <div className={styles.orderDetails}>
            <div className={styles.orderText}>
              <div>Кол-во товаров</div>
              <div className={styles.flex}></div>
              <div>{totalProductCount}</div>
            </div>
            <div className={styles.orderText}>
              <div>Стоимость</div>
              <div className={styles.flex}></div>
              <div>{totalSum} ₸</div>
            </div>
            <div className={styles.orderText}>
              <div>Доставка</div>
              <div className={styles.flex}></div>
              <div>{deliveryPrice} ₸</div>
            </div>
            <div className={styles.orderText}>
              <div>Итого</div>
              <div className={styles.flex}></div>
              <div>{totalWithDelivery} ₸</div>
            </div>
          </div>
        </div>

        <div className={styles.userInfo}>
          <h3>Кто получит товар?</h3>
          <div className={styles.choise_client_buttons}>
            <button
              onClick={() => {
                setIsSelfRecipient(false);
                setFormData((prev) => ({
                  ...prev,
                  isSelfRecipient: false,
                }));
              }}
              className={isSelfRecipient ? "" : styles.buttonChoised}
            >
              Другой человек
            </button>

            <button
              onClick={() => {
                setIsSelfRecipient(true);
                setFormData((prev) => ({
                  ...prev,
                  isSelfRecipient: true,
                }));
              }}
              className={isSelfRecipient ? styles.buttonChoised : ""}
            >
              Я сам
            </button>
          </div>
          {!isSelfRecipient && (
            <div className={styles.choise_anonymously}>
              <button
                onClick={handleClickAnonymously}
                className={`${styles.button} ${
                  anonymously ? styles.buttonChoised : ""
                }`}
              ></button>
              <span>{anonymously ? "🗸" : ""}</span>
              <div>Анонимно</div>
            </div>
          )}

          <div className={styles.clientNames}>
            <div className={styles.profile_section}>
              <div className={styles.flex}>
                <label htmlFor="senderName">Имя отправителя</label>
                <input
                  id="senderName"
                  name="senderName"
                  value={formData.senderName}
                  type="text"
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.flex}>
                <label htmlFor="senderPhone">Телефон отправителя</label>
                <input
                  id="senderPhone"
                  name="senderPhone"
                  value={formData.senderPhone}
                  type="text"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {!isSelfRecipient && (
              <div className={styles.profile_section}>
                <div className={styles.flex}>
                  <label htmlFor="recipientName"> Имя получателя</label>
                  <input
                    id="recipientName"
                    name="recipientName"
                    value={formData.recipientName}
                    type="text"
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.flex}>
                  <label htmlFor="recipientPhone"> Телефон получателя</label>
                  <input
                    id="recipientPhone"
                    name="recipientPhone"
                    value={formData.recipientPhone}
                    type="text"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3>Доставка</h3>
          <div className={styles.deliveryChoise}>
            <label className={styles.option}>
              <input
                type="radio"
                name="delivery"
                value="pickup"
                checked={selectedZone === "pickup"}
                onChange={(e) => {
                  setSelectedZone(e.target.value);
                  setFormData((prev) => ({
                    ...prev,
                    deliveryZone: e.target.value,
                  }));
                }}
              />
              <span className={styles.custom_choise}>Самовывоз</span>
            </label>
            <br />

            <label className={styles.option}>
              <input
                type="radio"
                name="delivery"
                value="zone1"
                checked={selectedZone === "zone1"}
                onChange={(e) => {
                  setSelectedZone(e.target.value);
                  setFormData((prev) => ({
                    ...prev,
                    deliveryZone: e.target.value,
                  }));
                }}
              />
              <span class={styles.custom_choise}>Доставка от 2500 ₸</span>
            </label>
            <br />

            <label className={styles.option}>
              <input
                type="radio"
                name="delivery"
                value="zone2"
                checked={selectedZone === "zone2"}
                onChange={(e) => {
                  setSelectedZone(e.target.value);
                  setFormData((prev) => ({
                    ...prev,
                    deliveryZone: e.target.value,
                  }));
                }}
              />
              <span class={styles.custom_choise}>Доставка (зона 2) 3000 ₸</span>
            </label>
            <br />

            <label className={styles.option}>
              <input
                type="radio"
                name="delivery"
                value="zone3"
                checked={selectedZone === "zone3"}
                onChange={(e) => {
                  setSelectedZone(e.target.value);
                  setFormData((prev) => ({
                    ...prev,
                    deliveryZone: e.target.value,
                  }));
                }}
              />
              <span class={styles.custom_choise}>
                Доставка (зона 3) 4000 ₸{" "}
              </span>
            </label>
            <br />
          </div>
          <div className={styles.deliveryChoise_text}>
            Cтоимость доставки рассчитывается индивидуально
          </div>
        </div>
        {/* Карта */}
        <div className={styles.map}>
          <div className={styles.map_title}>Выберите зону доставки</div>
          <div className={styles.map_underTitle}>
            Воспользуйтесь кнопкой «найти», чтобы ввести адрес и узнать
            стоимость доставки.
          </div>
          <MapContainer
            center={center}
            zoom={11}
            style={{ height: "500px", width: "100%", margin: "20px 0px" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Зелёная зона */}
            <Circle
              center={center}
              radius={10000}
              pathOptions={{ color: "blue", fillOpacity: 0.1 }}
            >
              <Popup>Доставка (зона 3) 4000 ₸</Popup>
            </Circle>
            <Circle
              center={center}
              radius={6000}
              pathOptions={{ color: "red", fillOpacity: 0.2 }}
            >
              <Popup>Доставка (зона 2) 3000 ₸</Popup>
            </Circle>
            <Circle
              center={center}
              radius={3000}
              pathOptions={{ color: "green", fillOpacity: 0.3 }}
            >
              <Popup>Доставка от 2500 ₸</Popup>
            </Circle>

            {/* Красная зона */}

            {/* Синяя зона */}
          </MapContainer>
          <div className={styles.map_info}>
            <div className={styles.map_info_flex}>
              <div className={styles.map_info_containers}>
                <span className={styles.map_green}></span>Стоимость доставки
                2500 ₸
              </div>
              <div className={styles.map_info_containers}>
                <span className={styles.map_red}></span>Стоимость доставки 3000
                ₸ (зона 2)
              </div>
            </div>
            <div className={styles.map_info_flex}>
              <div className={styles.map_info_containers}>
                <span className={styles.map_blue}></span>Стоимость доставки 4000
                ₸ (зона 3)
              </div>
              <div style={{ opacity: "0", width: "48%" }}>
                <span></span>Стоимость доставки 6000 ₸ (зона 4)
              </div>
            </div>
          </div>
        </div>

        <div className={styles.order_adresse}>
          <h3>Адрес доставки</h3>
          <div className={styles.flex}>
            <label htmlFor="address">
              {" "}
              Город, улица, дом, подъезд, квартира *
            </label>
            <input
              id="address"
              name="address"
              value={formData.address}
              type="text"
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.flex}>
            <label htmlFor="comment"> Добавьте комментарий к заказу</label>
            <input
              id="comment"
              name="comment"
              value={formData.comment}
              type="text"
              onChange={handleInputChange}
            />
          </div>
        </div>
        {Array.isArray(errorMessage) && errorMessage.length > 0 && (
          <div className={styles.errorContainer}>
            <div className={styles.errorDiv}>
              <div className={styles.title}>Заполните поля:</div>
              {errorMessage.map((message, index) => (
                <div key={index} className={styles.message}>
                  ⚠️ {message}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.sendButton}>
          {formDataValide && (
            <div className={styles.notificationSuccess}>
              ✅ Заказ отправлен менеджеру, он свяжется с вами в ближайшее
              время.
            </div>
          )}
          {!formDataValide && (
            <button onClick={handleOrderSubmit} className={styles.orderButton}>
              Оформить заказ
            </button>
          )}
        </div>
        <div className={styles.underButton}>
          Нажимая кнопку «Оформить заказ» вы соглашаетесь на обработку ваших
          персональных данных на условиях, определенных Политикой
          конфиденциальности и условиями Публичной оферты.
        </div>
      </div>

      {/* Правая часть */}
      <div className={styles.orderInfo} ref={orderInfoRef}>
        <div className={styles.orderTitle}>Ваш заказ</div>
        <div className={styles.orderDetails}>
          <div className={styles.orderText}>
            <div>Кол-во товаров</div>
            <div className={styles.flex}></div>
            <div>{totalProductCount}</div>
          </div>
          <div className={styles.orderText}>
            <div>Стоимость</div>
            <div className={styles.flex}></div>
            <div>{totalSum} ₸</div>
          </div>
          <div className={styles.orderText}>
            <div>Доставка</div>
            <div className={styles.flex}></div>
            <div>{deliveryPrice} ₸</div>
          </div>
          <div className={styles.orderText}>
            <div>Итого</div>
            <div className={styles.flex}></div>
            <div>{totalWithDelivery} ₸</div>
          </div>
        </div>
        {!hideButton && (
          <div>
            {formDataValide && (
              <div className={styles.notificationSuccess}>
                ✅ Заказ отправлен менеджеру, он свяжется с вами в ближайшее
                время.
              </div>
            )}
            {!formDataValide && (
              <button
                onClick={handleOrderSubmit}
                className={styles.orderButton}
              >
                Оформить заказ
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Basket;
