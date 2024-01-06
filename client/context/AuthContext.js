// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:6062";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/users`);
        setUser(response.data);
      } catch (error) {
        // If there is an error, set user to null
        setUser(null);
      } finally {
        // Set loading to false after checking authentication
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (formData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/users/login`,
        formData
      );
      const { token, ...userData } = response.data;

      // Store the token in local storage
      localStorage.setItem("userToken", token);

      setUser(userData);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const logout = async () => {
    // Remove the token from local storage on logout
    localStorage.removeItem("userToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
