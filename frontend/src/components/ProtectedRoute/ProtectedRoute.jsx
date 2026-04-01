import { useAuth } from "../../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ requiredRole, children }) => {
  const { user, userRole } = useAuth();

  if (!user || (userRole !== "super admin" && requiredRole === "super admin")) {
    //console.log("protected ", user, userRole);
    return <Navigate to="/login" replace />;
  }
  //console.log("protected ", user, userRole);
  return children;
};

export default ProtectedRoute;
