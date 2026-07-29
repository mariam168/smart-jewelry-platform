import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCurrentUser,
  logoutUser,
} from "../services/authApi";

const AuthContext =
  createContext(null);

export const AuthProvider = ({
  children,
}) => {
  const [
    user,
    setUser,
  ] = useState(null);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    isAuthenticated,
    setIsAuthenticated,
  ] = useState(false);

  const loadCurrentUser =
    async () => {
      try {
        const response =
          await getCurrentUser();

        setUser(
          response.data
        );

        setIsAuthenticated(
          true
        );
      } catch (error) {
        setUser(null);

        setIsAuthenticated(
          false
        );
      } finally {
        setIsLoading(false);
      }
    };

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);

      setIsAuthenticated(
        false
      );
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    setUser,
    setIsAuthenticated,
    logout,
  };

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context =
    useContext(
      AuthContext
    );

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};