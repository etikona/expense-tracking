"use client";

import React, { useState } from "react";
import "./Navbar.css";
import Link from "next/link";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          Expense Tracker
        </Link>

        <ul className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/summary">Summary</a>
          </li>
          <li>
            <a href="/settings">Set Limits</a>
          </li>
          <li>
            <a href="/expenses">Expense</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
        </ul>

        <button className="navbar-toggle" onClick={toggleMobileMenu}>
          <span className="navbar-toggle-icon"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
