import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the ThemeContext
const ThemeContext = createContext();

// ThemeContext Provider Component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.className = theme; // Apply the theme to the document
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => 
      prevTheme === 'light' ? 'dark' : 
      prevTheme === 'dark' ? 'current' : 
      'light'
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook for consuming the ThemeContext
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
