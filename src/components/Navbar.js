import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { ThemeContext } from "../ThemeContext";

function Navbar() {
  const { darkMode, setDarkMode, fontSize, setFontSize } = useContext(ThemeContext);

  return (
    <nav className={`navbar ${darkMode ? "dark" : ""}`}>
      <h1 className="logo">InclusionLens</h1>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/resources">Resources</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className="controls">
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />{" "}
          Dark Mode
        </label>

        <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
          <option value="small">A-</option>
          <option value="medium">A</option>
          <option value="large">A+</option>
        </select>
      </div>
    </nav>
  );
}

export default Navbar;
