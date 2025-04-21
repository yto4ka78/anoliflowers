import React, { useEffect, useState } from "react";
import styles from "./NavBar.module.scss";
import { Link } from "react-router-dom";
import phoneLogo from "../../assets/images/logo_phone.png";
import mailLogo from "../../assets/images/logo_mail.png";
import basketLogo from "../../assets/images/logo_basket.png";
import { getUserFromToken } from "../../utils/getUser";
import api from "../../utils/api";

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
      <div className={styles.NavBar_Main_Section0}>
        <div>Доставка по всей Алматинской области</div>
      </div>
      <div className={styles.NavBar_Main_Section1}>
        <div className={styles.NavBar_Main_Section1_leftParty}>
          <div>
            <img src={phoneLogo} alt="" />
            +77714661111
          </div>
          <div>
            {" "}
            <img src={mailLogo} alt="" />
            erik.sitnikov.fr@gmail.com
          </div>
        </div>
        <div className={styles.NavBar_Main_Section1_centralParty}>
          <div>ЦВЕТОЧНЫЙ ДОМ</div>
          <a href="/">Главная страница</a>
        </div>

        {/* Если нужно добавить систему егистраций и входа, расскоментировать код снизу, а нижний код  (49 - 69)для входа в профиль заккоментировать */}
        <div className={styles.NavBar_Main_Section1_rightParty}>
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
            <div className={styles.link_toConnexion}></div>
          )}
          {/* {user ? (
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
              <Link to="/registration" className="">
                Войти
              </Link>
            </div>
          )}
          <div className={styles.NavBar_Main_Section1_rightParty_basket}>
            <div>0 Тг.</div>
            <div>
              0 <img src={basketLogo} alt="" />
            </div>
          </div> */}
        </div>
      </div>
      <div className={styles.NavBar_Main_Section2}>
        <div className={styles.burger} onClick={toggleMenu}>
          {menuOpen ? "✖ Список категорий" : "☰ Список категорий"}
        </div>

        <div
          className={`${styles.navLinks} ${menuOpen ? styles.show : ""}`}
          onClick={() => setMenuOpen(false)}
        >
          <div>
            <Link to="/allCategories">Все категории</Link>
          </div>
          {Array.isArray(links) &&
            links.map((link) => (
              <div key={link.id}>
                <Link to={`/category/${link.id}`}>{link.Name}</Link>
              </div>
            ))}
          <div>
            <Link to="">Отзывы</Link>
          </div>
          <div>
            <Link to="/contacts">Контакты</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
