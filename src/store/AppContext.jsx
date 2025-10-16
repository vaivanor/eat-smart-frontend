import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { fetchData } from "../utils/fetchData";
import { refreshAccessToken } from "../utils/refreshAccessToken";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [wasLoggedIn, setWasLoggedIn] = useState(() => {
    return localStorage.getItem("wasLoggedIn") === "true";
  });

  const navigate = useNavigate();

  const isTokenValid = (token) => {
    try {
      const { exp } = jwtDecode(token);
      return exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };

  const handleLogout = async () => {
    await fetchData({
      endpoint: "/logout",
      method: "POST",
      setIsLoading,
      navigate,
      onSuccess: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("wasLoggedIn");
        setIsLoggedIn(false);
        setCurrentUser(null);
        setWasLoggedIn(false);
        navigate("/");
      },
      onError: (error) => {
        console.error("Logout failed:", error);
      },
    });
  };

  const fetchProfile = async (token) => {
    await fetchData({
      endpoint: "/profile",
      token,
      setIsLoading,
      navigate,
      requireAuth: true,
      onSuccess: (result) => {
        setCurrentUser(result.data);
        setIsLoggedIn(true);
      },
      onError: () => {
        handleLogout();
      },
    });
  };

  useEffect(() => {
    const initializeAuth = async () => {
      if (!wasLoggedIn) return;

      let token = localStorage.getItem("accessToken");

      if (!token || !isTokenValid(token)) {
        try {
          const newToken = await refreshAccessToken();
          if (newToken) {
            localStorage.setItem("accessToken", newToken);
            token = newToken;
          } else {
            localStorage.removeItem("wasLoggedIn");
            setWasLoggedIn(false);
            handleLogout();
            return;
          }
        } catch (error) {
          console.error("Token refresh failed:", error);
          handleLogout();
          return;
        }
      }

      await fetchProfile(token);
    };

    initializeAuth();
  }, []);

  const handleLogin = async (token) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("wasLoggedIn", "true");
    setIsLoggedIn(true);
    setWasLoggedIn(true);
    await fetchProfile(token);
  };

  const value = {
    isLoading,
    setIsLoading,
    isLoggedIn,
    currentUser,
    handleLogin,
    handleLogout,
    wasLoggedIn,
    setWasLoggedIn,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};
