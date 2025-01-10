"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLimit } from "@/store/slice/limitsSlice";
import { toast } from "react-toastify";
import "./settings.css";

const LimitPage = () => {
  const dispatch = useDispatch();
  const limits = useSelector((state) => state.limits?.limits);
  const [formData, setFormData] = useState({
    groceries: limits?.groceries || "",
    transportation: limits?.transportation || "",
    healthcare: limits?.healthcare || "",
    utility: limits?.utility || "",
    charity: limits?.charity || "",
    miscellaneous: limits?.miscellaneous || "",
  });
  const [loading, setLoading] = useState(false);

  const handleLimitChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //* Save limits to Redux and Backend
  const handleLimits = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      for (const [category, limit] of Object.entries(formData)) {
        if (limit && limit > 0) {
          dispatch(setLimit({ category, limit: parseInt(limit, 10) }));
        }
        console.log("Category:", category, "limit", limit);
      }
      toast.success("Limits set successfully");
    } catch (error) {
      toast.error("Failed to set limits");
      console.error("Failed to set limits", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-page">
      <h2>Set Your Monthly Spending Limits</h2>
      <form onSubmit={handleLimits} className="limits-form">
        {Object.keys(formData).map((category) => (
          <div className="limit-input" key={category}>
            <label htmlFor={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </label>
            <input
              type="number"
              id={category}
              name={category}
              value={formData[category]}
              onChange={handleLimitChange}
              min="0"
              placeholder={`Enter limit for ${category}`}
            />
          </div>
        ))}
        <button type="submit" className="save-btn" disabled={loading}>
          {loading ? "Saving..." : "Save Limits"}
        </button>
      </form>
    </div>
  );
};

export default LimitPage;
