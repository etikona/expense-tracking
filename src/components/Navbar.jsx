"use client";

import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          Expense Tracker
        </a>

        {/* Desktop Menu */}
        <ul className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/summary">Summary</a>
          </li>
          <li>
            <a href="/settings">Settings</a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="navbar-toggle" onClick={toggleMobileMenu}>
          <span className="navbar-toggle-icon"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
