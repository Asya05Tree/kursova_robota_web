import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children, initialTheme = false }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : initialTheme;
  });

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    updateBodyTheme(newMode);
  };

  const updateBodyTheme = (mode) => {
    document.body.classList.toggle('dark-theme', mode);
    document.body.classList.toggle('light-theme', !mode);
    
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.style.backgroundColor = mode ? '#383838' : '#ffe8d7';
    }
  };

  useEffect(() => {
    updateBodyTheme(isDarkMode);
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ 
      isDarkMode, 
      toggleTheme, 
      setIsDarkMode 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);