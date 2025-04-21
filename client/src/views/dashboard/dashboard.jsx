import React, { useState, useEffect } from "react";
import styles from "./dashboard.module.scss";
import CreateBouquet from "./CreateBouquet";
import Orders from "./ordersRoot";
import ManageBouquet from "./ManageBouquet";
import ManageCategories from "./ManageCategories";
import OrderRootDetail from "./OrderRootDetail";
import ModifyBouquet from "./ModifyBouquet";
import ManageNavBar from "./ManageNavBar";
import ModifyCategory from "./ModifyCategory";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("orders");
  const [selectedBouquet, setSelectedBouquet] = useState(null);
  const [categoryToModify, setCategoryToModify] = useState(null);

  const renderMainView = () => {
    switch (activeView) {
      case "addBouquet":
        return <CreateBouquet />;
      case "manageBouquet":
        return (
          <ManageBouquet
            setActiveView={setActiveView}
            setSelectedBouquet={setSelectedBouquet}
          />
        );
      case "ModifyBouquet":
        return (
          <ModifyBouquet
            bouquet={selectedBouquet}
            setActiveView={setActiveView}
          />
        );
      case "manageCategories":
        return (
          <ManageCategories
            setActiveView={setActiveView}
            setCategoryToModify={setCategoryToModify}
          />
        );
      // case "orders":
      //   return <Orders setActiveView={setActiveView} />;
      // case "OrderRootDetail":
      //   return <OrderRootDetail setActiveView={setActiveView} />;
      case "ModifyCategory":
        return <ModifyCategory category={categoryToModify} />;
      case "ManageNavBar":
        return <ManageNavBar setActiveView={setActiveView} />;
      default:
        return <CreateBouquet />;
    }
  };
  return (
    <div className={styles.dashboard_main}>
      <div className={styles.dashboard_main_navbar}>
        {/* <button onClick={() => setActiveView("orders")}>Заказы</button> */}
        <button onClick={() => setActiveView("addBouquet")}>
          Добавить букет
        </button>
        <button onClick={() => setActiveView("manageBouquet")}>
          Управление букетами
        </button>
        <button onClick={() => setActiveView("manageCategories")}>
          Управление категориями
        </button>
        <button onClick={() => setActiveView("ManageNavBar")}>
          Навигационная панель
        </button>
      </div>
      <div className={styles.dashboard_mainview}>{renderMainView()}</div>
    </div>
  );
};

export default Dashboard;
