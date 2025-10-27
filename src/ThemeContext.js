import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState("medium");

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
    document.body.style.fontSize =
      fontSize === "small" ? "14px" :
      fontSize === "large" ? "18px" : "16px";
  }, [darkMode, fontSize]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, fontSize, setFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
};
