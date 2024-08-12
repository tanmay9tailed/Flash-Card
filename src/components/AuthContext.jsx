import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Parse localStorage value as boolean
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("user") === "true");

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("user", "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("user", "false");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
