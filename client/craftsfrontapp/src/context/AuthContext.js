import React, { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ isAuthenticated: false, token: null, username: "" });
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = cookies.token;

      if (!token) {
        setAuthState({ isAuthenticated: false, token: null, username: "" });
        navigate("/login");
        return;
      }

      try {
        const { data } = await axios.post(
          "http://localhost:4000/user",
          {},
          { withCredentials: true }
        );
        const { status, user } = data;

        if (status) {
          setAuthState({ isAuthenticated: true, token, username: user });
        } else {
          removeCookie("token");
          setAuthState({ isAuthenticated: false, token: null, username: "" });
          navigate("/login");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        removeCookie("token");
        setAuthState({ isAuthenticated: false, token: null, username: "" });
        navigate("/login");
      }
    };

    verifyToken();
  }, [cookies, navigate, removeCookie]);

  const logout = () => {
    removeCookie("token");
    setAuthState({ isAuthenticated: false, token: null, username: "" });
    navigate("/signup");
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
