import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import MenuItems from './MenuItems';
const Home = () => {
  const navigate = useNavigate();
  const { authState, setAuthState } = useAuth();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyToken = async () => {
      if (!authState.isAuthenticated) {
        
        navigate("/login");
      } else {
        try {
         
          const { data } = await axios.post(
            "http://localhost:4000/user", 
            {},
            { withCredentials: true }
          );
          const { status, user } = data;
          setUsername(user); 
          if (status) {
            
            toast(`Hello ${user}`, {
              position: "top-right",
            });
            
            setAuthState({ isAuthenticated: true, token: cookies.token });
          } else {
            
            setAuthState({ isAuthenticated: false, token: null });
            navigate("/login");
          }
        } catch (error) {
          
          setAuthState({ isAuthenticated: false, token: null });
          navigate("/login");
        }
      }
    };
    verifyToken();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    setAuthState({ isAuthenticated: false, token: null });
    navigate("/signup");
  };
  return (
    <>
      <div className="home_page">
        <h4>
          {" "}
          <i>Welcome <span>{username}</span></i>
        </h4>
        <button onClick={Logout}>Logout</button>
      </div>
      <ToastContainer />
      <MenuItems />
    </>
  )
}

export default Home
