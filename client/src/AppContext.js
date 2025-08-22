import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [lang, setLang] = useState("python");
  // to run the code
  const [code, setCode] = useState('print("hello")');
  const [runCodeTrigger, setRunCodeTrigger] = useState(0);
  const triggerCodeRun = () => setRunCodeTrigger(prev => prev + 1); // Increment to ensure change

  const value = {
    lang,
    setLang,
    code, setCode,
    runCodeTrigger, setRunCodeTrigger,
    triggerCodeRun,
    
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// custom hook for easy consumption for components
export const useAppContext = () => {
  return useContext(AppContext);
};