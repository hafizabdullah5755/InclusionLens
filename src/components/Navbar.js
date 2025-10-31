import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  // Sync font size to the document root
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };

  // Font size controls
  const increaseFont = () => setFontSize((s) => Math.min(s + 2, 24));
  const decreaseFont = () => setFontSize((s) => Math.max(s - 2, 12));
  const resetFont = () => setFontSize(16);

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="nav-logo" tabIndex="0">
        InclusionLens
      </div>

      <ul className="nav-links">
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/resources">Resources</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>

      <div className="controls" aria-label="Accessibility controls">
        <button onClick={toggleDarkMode} aria-pressed={darkMode}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
        <button onClick={increaseFont} aria-label="Increase font size">
          A+
        </button>
        <button onClick={decreaseFont} aria-label="Decrease font size">
          A-
        </button>
        <button onClick={resetFont} aria-label="Reset font size">
          A
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
