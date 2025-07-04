import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedRoute from "./utils/protectedRoute";
import Main from "./views/main/Main";
import NavBar from "./UI/navbar/NavBar";
import Footer from "./UI/footer/Footer";
import Registration from "./views/registration/Registration";
import Dashboard from "./views/dashboard/dashboard";
import ProfileScript from "./views/profile/ProfileScript";
import AllCategory from "./views/categoryPages/AllCategory";
import CategorySpecial from "./views/categoryPages/CategorySpecial";
import ProductPage from "./UI/productPage/ProductPage";
import Contacts from "./views/contacts/Contacts";
import Confidentiality from "./UI/footer/Confidentiality";
import Cookie from "./UI/footer/Cookie";
import Login from "./views/registration/Login.jsx";
import EmailVerified from "./views/registration/EmailVerified.jsx";
import Basket from "./views/basket/Basket.jsx";
import Delivery from "./views/delivery/Delivery.jsx";
import EmailChanged from "./views/registration/EmailChanged.jsx";
import ForgetPassword from "./views/registration/ForgetPassword.jsx";
import ResetPassword from "./views/registration/ResetPassword.jsx";
import MapSite from "./views/mapSite/MapSite.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="app_container">
      <BrowserRouter>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          theme="light"
        />
        <NavBar />
        <div style={{ flex: "1" }}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/mapsite" element={<MapSite />} />
            <Route path="/allCategories" element={<AllCategory />} />
            <Route path="/category/:id" element={<CategorySpecial />} />
            <Route path="/product_page/:id" element={<ProductPage />} />
            <Route path="/cookie" element={<Cookie />} />
            <Route path="/confidentiality" element={<Confidentiality />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/forget_pass" element={<ForgetPassword />} />
            <Route path="/reset_password" element={<ResetPassword />} />
            <Route path="/email-verified" element={<EmailVerified />} />
            <Route path="/email-changed" element={<EmailChanged />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedRoles={["user", "root", "admin"]}>
                  <ProfileScript />
                </ProtectedRoute>
              }
            />
            <Route path="/basket" element={<Basket />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["root", "admin"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
