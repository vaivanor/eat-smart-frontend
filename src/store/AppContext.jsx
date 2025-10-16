import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { fetchData } from "../utils/fetchData";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const isTokenValid = (token) => {
    try {
      const { exp } = jwtDecode(token);
      return exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/sign-in");
  };

  const fetchProfile = async (token) => {
    await fetchData({
      endpoint: "/profile",
      token,
      setIsLoading,
      navigate,
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
    const token = localStorage.getItem("accessToken");

    if (!token || !isTokenValid(token)) {
      handleLogout();
      return;
    }

    fetchProfile(token);
  }, []);

  const handleLogin = async (token) => {
    localStorage.setItem("accessToken", token);
    setIsLoggedIn(true);
    await fetchProfile(token);
  };

  const value = {
    isLoading,
    setIsLoading,
    isLoggedIn,
    currentUser,
    handleLogin,
    handleLogout,
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
