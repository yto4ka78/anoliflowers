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
  const [links, setLinks] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
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
            <a href="">
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
            <div className={styles.navLinks_menu}>
              {/* <Link to="/allCategories">
                <img src="/" alt="" />
                Меню
              </Link> */}
              <MenuButton></MenuButton>
            </div>
            {/* {Array.isArray(links) &&
            links.map((link) => (
              <div key={link.id}>
                <Link to={`/category/${link.id}`}>{link.Name}</Link>
              </div>
            ))} */}
            <div className={styles.navLinks__categories}>
              <div>
                <Link to="">Каталог</Link>
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
