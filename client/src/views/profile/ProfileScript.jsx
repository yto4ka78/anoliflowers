import React, { useState } from "react";
import styles from "./profileScript.module.scss";
// import ProfileOrders from "./ProfileOrders";
import userHasRole from "../../utils/userRole";
import { Link, useNavigate } from "react-router-dom";
import Profile from "./Profile";

const ProfileScript = () => {
  const [activeProfileView, setActiveProfileView] = useState("profile");
  const RenderMainProfile = () => {
    switch (activeProfileView) {
      // case "orders":
      //   return <ProfileOrders />;
      default:
        return <Profile />;
    }
  };
  const navigate = useNavigate();

  return (
    <div className={styles.profileScript_main}>
      <div className={styles.profileScript_navbar}>
        <button onClick={() => setActiveProfileView("profile")}>Профиль</button>
        {/* <button onClick={() => setActiveProfileView("orders")}>Заказы</button> */}
        {userHasRole("root") && (
          <button onClick={() => navigate("/dashboard")}>Admin</button>
        )}
      </div>
      <div>{RenderMainProfile()}</div>
    </div>
  );
};

export default ProfileScript;
