// utils/api.js

import axios from "axios";

// Create an axios instance to simplify requests and base URL management
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api", // Change to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to fetch current limits from the backend
// utils/api.js
export const fetchLimits = async () => {
  try {
    const response = await api.get("/limits");
    return response.data;
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching limits:", error);
    throw new Error("Failed to fetch limits");
  }
};

export const saveLimits = async (limits) => {
  try {
    const response = await api.post("/limits", limits);
    return response.data;
  } catch (error) {
    console.error("Error saving limits:", error);
    throw new Error("Failed to save limits");
  }
};

// Optionally, add more helper functions for other API calls like expense tracking, etc.
