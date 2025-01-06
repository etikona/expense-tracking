// src/app/settings/page.js

"use client";

import { useSelector, useDispatch } from "react-redux";
import { setLimit, resetLimits } from "@/store/slice/limitsSlice";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SettingsPage() {
  const dispatch = useDispatch();
  const limits = useSelector((state) => state.limit);

  const [newLimits, setNewLimits] = useState(limits);
  const [alert, setAlert] = useState("");

  // Fetch current limits from backend
  useEffect(() => {
    const fetchLimits = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/limits");
        setNewLimits(response.data);

        // Update Redux state with the fetched limits
        Object.keys(response.data).forEach((category) => {
          dispatch(setLimit({ category, limit: response.data[category] }));
        });
      } catch (error) {
        console.error("Error fetching limits:", error);
      }
    };
    fetchLimits();
  }, [dispatch]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLimits((prevLimits) => ({
      ...prevLimits,
      [name]: parseFloat(value) || 0, // Ensure it's a number
    }));
  };

  // Save updated limits to both Redux and backend
  const handleSave = async () => {
    try {
      const updatedLimits = { ...newLimits };

      // Check if any category's new limit is less than the current expenses
      const totalExpenses = {}; // Assuming total expenses will be available from the Redux store or backend
      let exceededCategory = null;
      Object.keys(updatedLimits).forEach((category) => {
        const expenseLimit = updatedLimits[category];
        const currentExpense = totalExpenses[category] || 0;

        if (expenseLimit < currentExpense) {
          exceededCategory = category;
        }
      });

      if (exceededCategory) {
        setAlert(
          `The limit for ${exceededCategory} cannot be less than the current expenses.`
        );
        return;
      }

      await axios.put("http://localhost:5000/api/limits", updatedLimits);

      // Update Redux state with the new limits
      Object.entries(updatedLimits).forEach(([category, limit]) => {
        dispatch(setLimit({ category, limit }));
      });
      setAlert("Limits updated successfully!");
    } catch (error) {
      console.error("Error saving limits:", error);
      setAlert("Failed to save limits");
    }
  };

  // Reset to initial Redux state
  const handleReset = () => {
    setNewLimits(limits);
    dispatch(resetLimits());
  };

  return (
    <div className="settings-container">
      <h1>Set Spending Limits</h1>
      <form>
        {Object.keys(newLimits).map((category) => (
          <div key={category} className="limit-input">
            <label>
              {category.charAt(0).toUpperCase() + category.slice(1)}:
              <input
                type="number"
                name={category}
                value={newLimits[category]}
                onChange={handleChange}
                min="0"
              />
            </label>
          </div>
        ))}
      </form>
      {alert && <div className="alert">{alert}</div>}
      <div className="buttons">
        <button type="button" onClick={handleSave}>
          Save Limits
        </button>
        <button type="button" onClick={handleReset}>
          Reset Limits
        </button>
      </div>
    </div>
  );
}
