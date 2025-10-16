import { Navigate } from "react-router-dom";
import { useAppContext } from "../../store/AppContext.jsx";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const isTokenValid = (token) => {
  try {
    const { exp } = jwtDecode(token);
    return exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const PrivateRoute = ({ children }) => {
  const { isLoggedIn, handleLogout } = useAppContext();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const valid = isLoggedIn && token && isTokenValid(token);

    if (!valid) {
      handleLogout();
      setShouldRedirect(true);
    }
  }, [isLoggedIn, handleLogout]);

  if (shouldRedirect) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};
