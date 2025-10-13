import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const value = {
    isLoading,
    setIsLoading,
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
