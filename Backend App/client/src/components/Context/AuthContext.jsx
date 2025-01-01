/* eslint-disable */
import { createContext, useState } from "react";
import { useContext } from "react";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");

  const [isAuthenticated, setIsAuthenticated] = useState(
    accessToken ? true : false
  );

  const login = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider, useAuth };
