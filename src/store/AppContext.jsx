import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../utils/fetchData";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);

    if (token) {
      fetchData({
        endpoint: "/profile",
        token,
        onSuccess: (result) => setCurrentUser(result.data),
        onError: (error) =>
          console.error("Failed to fetch user profile:", error),
      });
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("accessToken", token);
    setIsLoggedIn(true);

    fetchData({
      endpoint: "/profile",
      token,
      onSuccess: (result) => setCurrentUser(result.data),
      onError: (error) => console.error("Failed to fetch user profile:", error),
    });
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      localStorage.removeItem("accessToken");
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
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
    throw new Error();
  }
  return context;
};
