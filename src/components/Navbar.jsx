// src/components/Navbar.js
import React,{useState} from 'react';
import "./navbar.css"

const Navbar = ({ currentUser, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (

    <>
    <nav className="navbar">
      <div className="navbar-logo">Logo</div>
      <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
        <button onClick={onLogout}>LogIn</button>
      </div>
      <div className="navbar-toggle" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
    </>
  
  );
};

export default Navbar;
