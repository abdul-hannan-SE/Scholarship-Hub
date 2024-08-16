// AuthProvider.js

import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("user-token") || "");
  const navigate = useNavigate();

  console.log(user, token)
  // localStorage.removeItem('user-token')
  const loginAction = async (data) => {
    console.log(data)
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
  
        }),
        
      });
      console.log("res", response);
      const res = await response.json();

       localStorage.removeItem("user-token");
      if (res.data) {
        setUser(res.data.user);
        setToken(res.data.token);
        console.log(res.data.token)
        localStorage.setItem("user-token", res.data.token);
        navigate("");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("user-token");
    navigate("");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction,logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
