import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return <Navigate to="/" />;
    }
    const userHasAccess = decoded.roles.some((role) =>
      allowedRoles.includes(role)
    );
    if (!userHasAccess) {
      return <Navigate to="/" />;
    }

    return children;
  } catch (error) {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
