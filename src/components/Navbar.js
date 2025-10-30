import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };

  const increaseFont = () => setFontSize((s) => Math.min(s + 2, 24));
  const decreaseFont = () => setFontSize((s) => Math.max(s - 2, 12));
  const resetFont = () => setFontSize(16);

  document.documentElement.style.fontSize = `${fontSize}px`;

  return (
    <nav className="navbar">
      <div className="nav-logo">InclusionLens</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/resources">Resources</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <div className="controls">
        <button onClick={toggleDarkMode}>{darkMode ? "☀️" : "🌙"}</button>
        <button onClick={increaseFont}>A+</button>
        <button onClick={decreaseFont}>A-</button>
        <button onClick={resetFont}>A</button>
      </div>
    </nav>
  );
}

export default Navbar;
