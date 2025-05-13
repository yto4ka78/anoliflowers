import React, { useEffect, useState, useRef } from "react";
import styles from "./NavBar.module.scss";
import { Link } from "react-router-dom";
import basketLogo from "../../assets/images/logo_basket.png";
import { getUserFromToken } from "../../utils/getUser";
import api from "../../utils/api";
import WhatsAppIcon from "./WhatsAppIcon";
import InstagramIcon from "./InstagramIcon";
import MenuButton from "./MenuButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState();
  // const [menuOpen, setMenuOpen] = useState(false);
  const [menuHovered, setMenuHovered] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);
  // const toggleMenu = () => setMenuOpen((prev) => !prev);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const totalProduct = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const navRef = useRef();

  useEffect(() => {
    const user = getUserFromToken();
    setUser(user);
    const getMenu = async () => {
      const response = await api.get("/main/getMenu");
      const links = response.data.categories;
      setLinks(links);
    };
    getMenu();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuHovered(false);
      }
    };

    if (menuHovered) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuHovered]);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch {}
  };
  return (
    <div className={styles.NavBar_Main}>
      <div className={styles.NavBar_Main_size}>
        <div className={styles.NavBar_Main_Section1}>
          <div className={styles.logo}>
            <a href="/">
              <img src="/logo.png" alt="" />
            </a>
          </div>
          <div className={styles.firstSection_text}>
            Доставка цветов по городу <br /> Алматы и Астана
          </div>
          <div className={styles.secondSection_text}>
            {/* <button href="">
              <div>Алматы</div> <img src="/arr-down.svg" alt="" />
            </button> */}
          </div>
          <div className={styles.thirdSection_text}>+337-80-33-54-90</div>
          <div className={styles.fourthSection_text}>
            <div>
              <WhatsAppIcon></WhatsAppIcon>
            </div>
            <div>
              <InstagramIcon></InstagramIcon>
            </div>
          </div>
          <div className={styles.loginSection}>
            {user ? (
              <div className={styles.dropdown}>
                <button className={styles.dropbtn}>Профиль</button>
                <div className={styles.dropdownContent}>
                  <Link to="/profile">Мой аккаунт</Link>
                  <Link
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                  >
                    Выйти
                  </Link>
                </div>
              </div>
            ) : (
              <div className={styles.link_toConnexion}>
                <Link to="/login" className="">
                  Войти
                </Link>
              </div>
            )}
            <a href="/basket" className={styles.linkBasket}>
              <div className={styles.NavBar_Main_Section1_rightParty_basket}>
                <div> {totalProduct ? totalProduct + " к-во." : "0 к-во."}</div>

                <div>
                  {totalPrice ? totalPrice + " Тг" : "0 Тг"}{" "}
                  <img src={basketLogo} alt="" />
                </div>
              </div>
            </a>
          </div>

          {/* Для телефона */}
          <div className={styles.burger_button}>
            <MenuButton></MenuButton>
          </div>
        </div>
      </div>

      {/* НавБар вторая часть */}
      <div className={styles.NavBar_Main_size2}>
        <div className={styles.NavBar_Main_Section2}>
          {/* <div className={styles.burger} onClick={toggleMenu}>
            {menuOpen ? "✖ Список категорий" : "☰ Список категорий"}
          </div> */}

          <div className={`${styles.navLinks} `}>
            <div
              className={styles.navBarWrapper}
              ref={navRef}
              onMouseEnter={() => setMenuHovered(true)}
            >
              {menuHovered && (
                <div
                  className={styles.overlay}
                  onClick={() => setMenuHovered(false)}
                ></div>
              )}{" "}
              <div className={styles.navLinks_menu}>
                <MenuButton></MenuButton>
                <div
                  className={`${styles.navLinks__categoriesFromBd} ${
                    menuHovered ? styles.showMenu : ""
                  }`}
                >
                  {Array.isArray(links) &&
                    links.length > 0 &&
                    links.map((link, index) => (
                      <div
                        key={index}
                        className={styles.categoryItem}
                        onMouseEnter={() => setActiveCategoryIndex(index)}
                      >
                        <button>
                          <div>{link.Name}</div>
                          <div>❯</div>
                        </button>
                        {activeCategoryIndex === index && (
                          <div className={styles.submenu}>
                            {link.Bouquets?.map((bouquet, i) => (
                              <button
                                key={i}
                                className={styles.submenuItem}
                                onClick={() => {
                                  navigate(`/product_page/${bouquet.id}`);
                                }}
                              >
                                {bouquet.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className={styles.navLinks__categories}>
              <div>
                <Link to="/allCategories">Каталог</Link>
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
      </div>
    </div>
  );
};

export default NavBar;
