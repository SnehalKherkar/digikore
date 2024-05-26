
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App = () => {
  const [currentUser, setCurrentUser] = useState('');

  const handleLogin = (username) => {
    setCurrentUser(username);
  };

  const handleLogout = () => {
    setCurrentUser('');
  };

  return (
    <Router>
      <AppContent currentUser={currentUser} onLogin={handleLogin} onLogout={handleLogout} />
    </Router>
  );
};

const AppContent = ({ currentUser, onLogin, onLogout }) => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && <Navbar currentUser={currentUser} onLogout={onLogout} />}
      <Routes>
        <Route path="/" element={<Login onLogin={onLogin} />} />
        <Route
          path="/dashboard"
          element={currentUser ? <Dashboard currentUser={currentUser} onLogout={onLogout} /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
};

export default App;
