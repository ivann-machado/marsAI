import { useauth } from "../../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ requiredRole, children }) => {
  const { user, userRole, login, logout } = useauth();

  if (!user || (userRole !== "superadmin" && requiredRole === "superadmin")) {
    //console.log("protected ", user, userRole);
    return <Navigate to="/login" replace />;
  }
  //console.log("protected ", user, userRole);
  return children;
};

export default ProtectedRoute;
