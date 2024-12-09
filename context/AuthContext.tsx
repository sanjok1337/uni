"use client"; // Додаємо цю директиву для клієнтської логіки

import React, { createContext, useContext, useEffect, useState } from "react";

// Типи для контексту
type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

// Створення контексту
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Провайдер
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Перевірка токена при завантаженні
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    localStorage.setItem("token", "your-token"); // зберігаємо токен
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Хук для доступу до контексту
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};
