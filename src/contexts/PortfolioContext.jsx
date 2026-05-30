import React, { createContext, useState, useContext, useEffect } from "react";
import { translations } from "../translations";

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("portfolioLanguage") || "en";
  });

  useEffect(() => {
    localStorage.setItem("portfolioLanguage", language);
  }, [language]);

  const t = translations[language];

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
