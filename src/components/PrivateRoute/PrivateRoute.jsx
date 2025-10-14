import { Navigate } from "react-router-dom";
import { useAppContext } from "../../store/AppContext.jsx";

export const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAppContext();

  return isLoggedIn ? children : <Navigate to="/sign-in" />;
};
