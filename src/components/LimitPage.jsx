// src/app/settings/page.js
"use client";
import { useSelector, useDispatch } from "react-redux";
import { setLimit, resetLimits } from "@/store/slice/limitsSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import "./LimitPage.css";
const LimitPage = () => {
  const dispatch = useDispatch();
  const limits = useSelector((state) => state.limit);

  const [newLimits, setNewLimits] = useState(limits);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    const fetchLimits = async () => {
      try {
        const response = await axios.get(
          "https://expense-back-f70o.onrender.com/api/limits"
        );
        setNewLimits(response.data);

        Object.keys(response.data).forEach((category) => {
          dispatch(setLimit({ category, limit: response.data[category] }));
        });
      } catch (error) {
        console.error("Error fetching limits:", error);
      }
    };
    fetchLimits();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLimits((prevLimits) => ({
      ...prevLimits,
      [name]: parseFloat(value) || 0, // Ensure it's a number
    }));
  };

  //* Save updated limits to both Redux and backend
  const handleSave = async () => {
    try {
      const updatedLimits = { ...newLimits };

      const totalExpenses = {};
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

      await axios.put(
        "https://expense-back-f70o.onrender.com/api/limits",
        updatedLimits
      );

      Object.entries(updatedLimits).forEach(([category, limit]) => {
        dispatch(setLimit({ category, limit }));
      });
      setAlert("Limits updated successfully!");
    } catch (error) {
      console.error("Error saving limits:", error);
      setAlert("Failed to save limits");
    }
  };

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
};
export default LimitPage;
