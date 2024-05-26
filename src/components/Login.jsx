
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== '' && password.trim() !== '') {
      onLogin(username);
      navigate('/dashboard');
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <div className="login-page">
      <h1>Digikore Studios</h1>
      <div className="login-container">
        <h2 className='login-heading'>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='input-box'>
            <label className='input-lable'>Username:</label>
            <input
              className='username-input'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='input-box'>
            <label className='input-lable'>Password:</label>
            <input
              className='username-input'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className='login-btn' type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
