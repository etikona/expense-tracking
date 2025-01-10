"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "@/store/slice/expensesSlice";
import { getLimits } from "@/store/slice/limitsSlice";
import "./ExpenseInputForm.css";

const ExpenseInput = () => {
  const dispatch = useDispatch();
  const { limits, status } = useSelector((state) => state.limits);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(getLimits());
    }
  }, [dispatch, status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const expenseAmount = parseFloat(amount);

    const selectedLimit = limits?.find((item) => item.category === category);

    if (!category) {
      setError("Please select a category.");
      return;
    }
    if (isNaN(expenseAmount) || expenseAmount <= 0) {
      setError("Please enter a valid amount greater than 0.");
      return;
    }
    if (!purpose.trim()) {
      setError("Purpose cannot be empty.");
      return;
    }

    if (selectedLimit && expenseAmount > selectedLimit.limit) {
      setError(
        `Expense amount exceeds the limit for ${category}. Limit: $${selectedLimit.limit}`
      );
      return;
    }

    const expenseData = {
      category,
      amount: expenseAmount,
      purpose: purpose.trim(),
      date: new Date(),
    };

    console.log("Adding Expense:", expenseData);
    dispatch(addExpense(expenseData));

    setCategory("");
    setAmount("");
    setPurpose("");
    setError("");
  };

  if (status === "loading") return <div>Loading limits...</div>;
  if (status === "failed") return <div>Failed to load limits.</div>;

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      {error && <div className="error-message">{error}</div>}

      <label htmlFor="category" className="expense-label">
        Category
      </label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className={`expense-input ${error && !category ? "input-error" : ""}`}
        aria-label="Select category"
      >
        <option value="">Select Category</option>
        {Array.isArray(limits) &&
          limits.map((limit) => (
            <option key={limit._id} value={limit.category}>
              {limit.category.charAt(0).toUpperCase() + limit.category.slice(1)}
            </option>
          ))}
      </select>

      <label htmlFor="amount" className="expense-label">
        Amount
      </label>
      <input
        id="amount"
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        min="0.01"
        step="0.01"
        className={`expense-input ${error && !amount ? "input-error" : ""}`}
        aria-label="Enter amount"
      />

      <label htmlFor="purpose" className="expense-label">
        Purpose
      </label>
      <input
        id="purpose"
        type="text"
        placeholder="Enter purpose of expense"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
        required
        className={`expense-input ${
          error && !purpose.trim() ? "input-error" : ""
        }`}
        aria-label="Enter purpose"
      />

      <button
        type="submit"
        className="expense-button"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Adding..." : "Add Expense"}
      </button>
    </form>
  );
};

export default ExpenseInput;
