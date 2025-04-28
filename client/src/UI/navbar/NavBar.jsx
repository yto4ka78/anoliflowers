import React, { useEffect, useState } from "react";
import styles from "./NavBar.module.scss";
import { Link } from "react-router-dom";
import phoneLogo from "../../assets/images/logo_phone.png";
import mailLogo from "../../assets/images/logo_mail.png";
import basketLogo from "../../assets/images/logo_basket.png";
import { getUserFromToken } from "../../utils/getUser";
import api from "../../utils/api";
import WhatsAppIcon from "./WhatsAppIcon";
import InstagramIcon from "./InstagramIcon";
import MenuButton from "./MenuButton";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([
    {
      id: 1,
      name: "Популярное",
      Bouquets: [
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
      ],
    },
    {
      id: 2,
      name: "Новинки",
      Bouquets: [
        {
          name: "КАПКАНЫ КАПКАНЫ КАПКАНЫ ",
          price: 9500,
          saleprice: 7500,
          imageUrl: [
            "https://res.cloudinary.com/dcuqusnsc/image/upload/v1743609816/ReactNode/Bouquet/n0ep0ntj5ahpe2noogym.webp",
          ],
        },
        {
          name: "Гуси",
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
      ],
    },
  ]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuHovered, setMenuHovered] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const user = getUserFromToken();
    setUser(user);
    const getNavBarLinks = async () => {
      const response = await api.get("/main/getNavBarLink");
      const links = response.data.categories;
      setLinks(links);
    };
    getNavBarLinks();
  }, []);

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
            <button href="">
              <div>Алматы</div> <img src="/arr-down.svg" alt="" />
            </button>
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
            <div className={styles.NavBar_Main_Section1_rightParty_basket}>
              <div>0 Тг.</div>
              <div>
                0 <img src={basketLogo} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* НавБар вторая часть */}
      <div className={styles.NavBar_Main_size2}>
        <div className={styles.NavBar_Main_Section2}>
          <div className={styles.burger} onClick={toggleMenu}>
            {menuOpen ? "✖ Список категорий" : "☰ Список категорий"}
          </div>

          <div
            className={`${styles.navLinks} ${menuOpen ? styles.show : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            <div
              className={styles.navBarWrapper}
              onMouseEnter={() => setMenuHovered(true)}
              onMouseLeave={() => setMenuHovered(false)}
            >
              {menuHovered && <div className={styles.overlay}></div>}{" "}
              <div className={styles.navLinks_menu}>
                <MenuButton></MenuButton>
                <div className={styles.navLinks__categoriesFromBd}>
                  {links.map((link, index) => (
                    <div
                      key={index}
                      className={styles.categoryItem}
                      onMouseEnter={() => setActiveCategoryIndex(index)}
                    >
                      <button>
                        <button>{link.name}</button>
                        <div>❯</div>
                      </button>
                      {activeCategoryIndex === index && (
                        <div className={styles.submenu}>
                          {link.Bouquets?.map((bouquet, i) => (
                            <button key={i} className={styles.submenuItem}>
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
                <Link to="">Доставка</Link>
              </div>
              <div>
                <Link to="/contacts">Контакты</Link>
              </div>
              <div>
                <Link to="/contacts">Оплата</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
