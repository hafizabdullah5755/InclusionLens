import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => (
  <nav className="navbar">
    <h2 className="logo">InclusionLens</h2>
    <div className="links">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/resources">Resources</Link>
      <Link to="/contact">Contact</Link>
    </div>
  </nav>
);

export default Navbar;
