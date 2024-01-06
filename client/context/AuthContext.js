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
        // Check if there's a token in localStorage
        const storedToken = localStorage.getItem("userToken");

        if (storedToken) {
          // If there's a token, set it in the axios headers
          axios.defaults.headers.common["x-auth-token"] = `${storedToken}`;
          // Fetch user data using the token
          const response = await axios.get(`${API_BASE_URL}/api/users`);
          setUser(response.data);
        } else {
          // If there's no token, set user to null
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
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

      // Set the token in the axios headers
      axios.defaults.headers.common["x-auth-token"] = `${token}`;

      setUser(userData);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const logout = async () => {
    // Remove the token from local storage on logout
    localStorage.removeItem("userToken");
    // Remove the token from axios headers
    delete axios.defaults.headers.common["Authorization"];
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
