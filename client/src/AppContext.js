import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [lang, setLang] = useState("python");

  const value = {
    lang,
    setLang,

  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// custom hook for easy consumption for components
export const useAppContext = () => {
  return useContext(AppContext);
};