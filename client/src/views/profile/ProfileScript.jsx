import React, { useState } from "react";
import styles from "./profileScript.module.scss";
import ProfileOrders from "./ProfileOrders";
import userHasRole from "../../utils/userRole";
import { Link, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import Adress from "./Adress";

const ProfileScript = () => {
  const [activeProfileView, setActiveProfileView] = useState("profile");
  const RenderMainProfile = () => {
    switch (activeProfileView) {
      case "profile":
        return <Profile />;
      case "orders":
        return <ProfileOrders />;
      case "address":
        return <Adress />;
      default:
        return <Profile />;
    }
  };
  const navigate = useNavigate();

  return (
    <div className={styles.profileScript_main}>
      <div className={styles.profileScript_navbar}>
        <button onClick={() => setActiveProfileView("orders")}>
          {" "}
          <img src="/busket_profile.svg" alt="" />
          Заказы
        </button>
        <button onClick={() => setActiveProfileView("address")}>
          {" "}
          <img src="/phoneicon_profile.svg" alt="" />
          Адреса
        </button>
        <button onClick={() => setActiveProfileView("profile")}>
          <img src="/phoneicon_profile.svg" alt="" />
          Анкета
        </button>
        {/* {userHasRole("root") && ( */}
        <button onClick={() => navigate("/dashboard")}>
          <img src="/adminicon_profile.svg" alt="" />
          Admin
        </button>
        {/*)} */}
        <button onClick={() => setActiveProfileView("profile")}>
          <img src="/desconnecticon_profile.svg" alt="" />
          Выйти
        </button>
      </div>
      <div>{RenderMainProfile()}</div>
    </div>
  );
};

export default ProfileScript;
