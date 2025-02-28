import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "./Signup.css"; // Import a CSS file for styling

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Signup button clicked"); // Debugging statement
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });
      console.log("Response:", res); // Log the response for debugging
      alert("Signup successful");
      navigate("/login"); // Redirect to login page
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message); // Log the error for debugging
      alert("Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="signup-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="signup-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="signup-input"
        />
        <button type="submit" className="signup-button">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;