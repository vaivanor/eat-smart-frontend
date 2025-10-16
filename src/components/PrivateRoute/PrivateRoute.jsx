import { useAppContext } from "../../store/AppContext";

export const PrivateRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useAppContext();

  if (isLoading) return null;

  return isLoggedIn ? children : null;
};
