import { useAppContext } from "../../store/AppContext";
import { Loader } from "../Loader/Loader";
import { Error } from "../../pages/Error.jsx";

export const PrivateRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useAppContext();

  if (isLoading) {
    return <Loader />;
  }

  return isLoggedIn ? (
    children
  ) : (
    <Error message="Access denied. Please sign in to view this page." />
  );
};
