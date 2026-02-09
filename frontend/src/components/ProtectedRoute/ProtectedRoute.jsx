import { useauth } from "../../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ requiredRole, children }) => {
  const { user, userRole, login, logout } = useauth();

  console.log("USer", user, requiredRole, userRole);
  if (!user || (requiredRole === "superadmin" && userRole !== "superadmin")) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
