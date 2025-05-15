import React, { useState } from "react";
import styles from "./profileScript.module.scss";
import ProfileOrders from "./ProfileOrders";
import userHasRole from "../../utils/userRole";
import { Link, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import Adress from "./Adress";
import ProfileOrdersDetail from "./ProfileOrdersDetail";

const ProfileScript = () => {
  const [activeProfileView, setActiveProfileView] = useState("profile");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const RenderMainProfile = () => {
    switch (activeProfileView) {
      case "profile":
        return <Profile />;
      case "orders":
        return (
          <ProfileOrders
            setActiveProfileView={setActiveProfileView}
            setSelectedOrder={setSelectedOrder}
          />
        );
      case "address":
        return <Adress />;
      case "profileOrderDetail":
        return (
          <ProfileOrdersDetail
            setActiveView={setActiveProfileView}
            order={selectedOrder}
          />
        );
      default:
        return <Profile />;
    }
  };
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch {}
  };

  return (
    <div className={styles.profileScript_main}>
      <div className={styles.profileScript_navbar}>
        <button onClick={() => setActiveProfileView("orders")}>
          {" "}
          <img src="/busket_profile.svg" alt="" />
          Заказы
        </button>
        <hr />
        {/* <button onClick={() => setActiveProfileView("address")}>
          {" "}
          <img src="/phoneicon_profile.svg" alt="" />
          Адреса
        </button> */}
        <button onClick={() => setActiveProfileView("profile")}>
          <img src="/phoneicon_profile.svg" alt="" />
          Анкета
        </button>
        <hr />
        {/* {userHasRole("root") && ( */}
        <button onClick={() => navigate("/dashboard")}>
          <img src="/adminicon_profile.svg" alt="" />
          Admin
        </button>
        <hr />
        {/*)} */}
        <button onClick={() => handleLogout()}>
          <img src="/desconnecticon_profile.svg" alt="" />
          Выйти
        </button>
      </div>
      <div>{RenderMainProfile()}</div>
    </div>
  );
};

export default ProfileScript;
