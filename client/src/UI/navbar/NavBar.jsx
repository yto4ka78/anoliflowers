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
  const [links, setLinks] = useState([]);
  const [menuHovered, setMenuHovered] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const totalProduct = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const navRef = useRef();
  //Для телефона
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const handleLinkClick = () => setMenuOpen(false);
  // Для изменения позиции submenu
  const [submenuPos, setSubmenuPos] = useState({ left: 629 });
  const itemRefs = useRef([]);

  const handleMouseEnter = (index) => {
    const rect = itemRefs.current[index].getBoundingClientRect();
    setSubmenuPos({ left: rect.right });
    setActiveCategoryIndex(index);
  };
  useEffect(() => {
    const handleResize = () => {
      if (
        activeCategoryIndex !== null &&
        itemRefs.current[activeCategoryIndex]
      ) {
        handleMouseEnter(activeCategoryIndex);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeCategoryIndex]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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
          <div className={styles.thirdSection_text}>+7 771 466 11 11</div>
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
            <MenuButton onClick={toggleMenu}></MenuButton>
            {menuOpen && (
              <div className={styles.overlay_phone}>
                <div className={styles.head_container}>
                  <div className={styles.logo_phone}>
                    <img src="/logo.png" alt="" />
                  </div>
                  <div
                    className={styles.close_burger}
                    onClick={() => {
                      toggleMenu();
                    }}
                  >
                    ×
                  </div>
                </div>
                <div className={styles.secondSection_phone}>
                  {Array.isArray(links) &&
                    links.length > 0 &&
                    links.map((link, index) => (
                      <div
                        key={index}
                        className={styles.categoryItem}
                        onClick={() => {
                          navigate(`/category/${link.id}`);
                          handleLinkClick();
                        }}
                      >
                        <button>
                          <div>{link.Name}</div>
                          <div>❯</div>
                        </button>
                      </div>
                    ))}
                  <hr />
                  <div className={styles.thirdSection_phone}>
                    <div>
                      <Link to="/allCategories" onClick={handleLinkClick}>
                        Каталог
                      </Link>
                    </div>
                    <div>
                      <Link
                        to={`/category/${"0fce425c-6935-425b-9984-2fe91119632e"}`}
                        onClick={handleLinkClick}
                      >
                        Розы
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/category/797e1197-28d9-4977-abd2-badce4e2663b"
                        onClick={handleLinkClick}
                      >
                        Пионы
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/category/b5e5e2ad-dbc1-4e33-893a-46950e234646"
                        onClick={handleLinkClick}
                      >
                        Съедобные
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/category/6099a6cc-9647-475b-aaa6-ad2bc20ac379"
                        onClick={handleLinkClick}
                      >
                        В коробке
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/category/35552479-2873-423d-9de1-1b30699a69bc"
                        onClick={handleLinkClick}
                      >
                        Тюльпаны
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/category/2c28c487-ce9c-4f22-8e59-1c8a61665a47"
                        onClick={handleLinkClick}
                      >
                        Лилии
                      </Link>
                    </div>
                    <div>
                      <Link to="/contacts" onClick={handleLinkClick}>
                        Контакты
                      </Link>
                    </div>
                    <div>
                      <Link to="/delivery" onClick={handleLinkClick}>
                        Доставка
                      </Link>
                    </div>
                  </div>
                </div>

                <div className={styles.flex}></div>

                <div className={styles.loginSection_phone}>
                  {user ? (
                    <div className={styles.dropdown}>
                      <Link to="/profile" onClick={handleLinkClick}>
                        Мой аккаунт
                      </Link>
                    </div>
                  ) : (
                    <div className={styles.link_toConnexion}>
                      <Link to="/login" onClick={handleLinkClick} className="">
                        Войти
                      </Link>
                    </div>
                  )}
                  <a href="/basket" className={styles.linkBasket}>
                    <div
                      className={styles.NavBar_Main_Section1_rightParty_basket}
                    >
                      <div>
                        {" "}
                        {totalProduct ? totalProduct + " к-во." : "0 к-во."}
                      </div>

                      <div>
                        {totalPrice ? totalPrice + " Тг" : "0 Тг"}{" "}
                        <img src={basketLogo} alt="" />
                      </div>
                    </div>
                  </a>
                </div>
                <div className={styles.icon_section}>
                  <div>
                    <WhatsAppIcon></WhatsAppIcon>
                  </div>
                  <div>
                    <InstagramIcon></InstagramIcon>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* НавБар вторая часть */}
      <div className={styles.NavBar_Main_size2}>
        <div className={styles.NavBar_Main_Section2}>
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
                        ref={(el) => (itemRefs.current[index] = el)}
                        className={styles.categoryItem}
                        onMouseEnter={() => handleMouseEnter(index)}
                        // onMouseEnter={() => setActiveCategoryIndex(index)}
                      >
                        <button>
                          <div>{link.Name}</div>
                          <div>❯</div>
                        </button>
                        {activeCategoryIndex === index && (
                          <div
                            className={styles.submenu}
                            style={{
                              position: "fixed",
                              left: submenuPos.left + 10,
                            }}
                          >
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
                <Link to="/allCategories" onClick={handleLinkClick}>
                  Каталог
                </Link>
              </div>
              <div>
                <Link
                  to={`/category/${"0fce425c-6935-425b-9984-2fe91119632e"}`}
                  onClick={handleLinkClick}
                >
                  Розы
                </Link>
              </div>
              <div>
                <Link
                  to={`/category/${"797e1197-28d9-4977-abd2-badce4e2663b"}`}
                  onClick={handleLinkClick}
                >
                  Пионы
                </Link>
              </div>
              <div>
                <Link
                  to={`/category/${"b5e5e2ad-dbc1-4e33-893a-46950e234646"}`}
                  onClick={handleLinkClick}
                >
                  Съедобные
                </Link>
              </div>
              <div>
                <Link
                  to={`/category/${"6099a6cc-9647-475b-aaa6-ad2bc20ac379"}`}
                  onClick={handleLinkClick}
                >
                  В коробке
                </Link>
              </div>
              <div>
                <Link
                  to={`/category/${"35552479-2873-423d-9de1-1b30699a69bc"}`}
                  onClick={handleLinkClick}
                >
                  Тюльпаны
                </Link>
              </div>
              <div>
                <Link
                  to={`/category/${"2c28c487-ce9c-4f22-8e59-1c8a61665a47"}`}
                  onClick={handleLinkClick}
                >
                  Лилии
                </Link>
              </div>
              <div>
                <Link to="/contacts" onClick={handleLinkClick}>
                  Контакты
                </Link>
              </div>
              <div>
                <Link to="/delivery" onClick={handleLinkClick}>
                  Доставка
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
