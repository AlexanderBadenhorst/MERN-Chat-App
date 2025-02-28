import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/" element={
            <>
              <header className="App-header">
                <h1>Welcome to the Chat App</h1>
                <div className="header-buttons">
                  <Link to="/login" className="login-button">Login</Link>
                  <Link to="/signup" className="signup-button">Signup</Link>
                </div>
              </header>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;