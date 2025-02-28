import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './Login.css'; // Import a CSS file for styling

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username); // Store the username in local storage
      alert("Login successful");
      navigate("/chat"); // Redirect to chat page
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message); // Log the error for debugging
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="login-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />
      <div className="button-container">
        <button onClick={handleLogin} className="login-button">Login</button>
        <Link to="/signup" className="signup-button">Signup</Link>
      </div>
    </div>
  );
};

export default Login;