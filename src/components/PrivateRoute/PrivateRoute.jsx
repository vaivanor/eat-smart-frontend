import { Navigate } from "react-router-dom";
import { useAppContext } from "../../store/AppContext";
import { Loader } from "../Loader/Loader";

export const PrivateRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useAppContext();

  if (isLoading) {
    return <Loader />;
  }

  return isLoggedIn ? children : <Navigate to="/sign-in" replace />;
};
