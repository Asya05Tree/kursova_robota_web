/*LanguageContext*/
import React, { createContext, useState, useContext } from 'react';
const LanguageContext = createContext();
export const useLanguage = () => useContext(LanguageContext);
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('uk');
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'uk' ? 'en' : 'uk');
  };
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};