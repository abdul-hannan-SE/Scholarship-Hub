
import React, { useState } from "react";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (isAdminLogin, isHireExpertLogin) => {
    // Simple validation for demonstration (replace with actual authentication logic)
    if (
      (isAdminLogin && email === "admin@example.com" && password === "admin123") ||
      (!isAdminLogin && email === "user@example.com" && password === "password") ||
      (isHireExpertLogin && email === "hire@example.com" && password === "hire123")
    ) {
      setError("");
      onLogin(isAdminLogin, isHireExpertLogin); // Notify parent component about successful login and specify the role
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </form>
        <div className="button-container">
          <button type="button" onClick={() => handleLogin(false, false)}>
            Login as User
          </button>
          <button className="adminB" onClick={() => handleLogin(true, false)}>
            Login as Admin
          </button>
          <button className="hireExpertB" onClick={() => handleLogin(false, true)}>
            Login as Hire Expert
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;