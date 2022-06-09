import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/index";
const RequireAuth = ({ children }) => {
  const { isToken } = useAuth();

  const location = useLocation();
  if (isToken) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export { RequireAuth };
