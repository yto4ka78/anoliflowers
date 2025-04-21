import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedRoute from "./utils/protectedRoute";
import Main from "./views/main/Main";
import NavBar from "./UI/navbar/NavBar";
import CreateBouquet from "./views/dashboard/CreateBouquet";
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

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <BrowserRouter>
        <NavBar />
        <div style={{ flex: "1" }}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/allCategories" element={<AllCategory />} />
            <Route path="/category/:id" element={<CategorySpecial />} />
            <Route path="/product_page/:id" element={<ProductPage />} />
            <Route path="/cookie" element={<Cookie />} />
            <Route path="/confidentiality" element={<Confidentiality />} />
            <Route path="/login" element={<Registration />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedRoles={["user", "root", "admin"]}>
                  <ProfileScript />
                </ProtectedRoute>
              }
            />
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
