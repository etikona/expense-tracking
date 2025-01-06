"use client";

import { motion } from "framer-motion";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <motion.div
        className="home-content"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="home-title">Welcome to Expense Tracker</h1>
        <p className="home-description">
          Simplify your expense management. Track, summarize, and stay within
          budget with ease.
        </p>
        <div className="home-buttons">
          <motion.a
            href="/summary"
            className="home-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            View Summary
          </motion.a>
          <motion.a
            href="/settings"
            className="home-btn secondary"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Set Spending Limits
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
