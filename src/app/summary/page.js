"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import "./summary.css";

const Summary = () => {
  const [limits, setLimits] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // * Fetch limits and expenses from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const limitsResponse = await axios.get(
          "https://expense-back-f70o.onrender.com/api/limits"
        );
        const expensesResponse = await axios.get(
          "https://expense-back-f70o.onrender.com/api/expenses"
        );
        setLimits(limitsResponse.data);
        setExpenses(expensesResponse.data);
      } catch (err) {
        console.error("Failed to fetch data:", err.message);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categories = Array.isArray(limits)
    ? limits.map((limit) => limit.category)
    : [];

  //* Group expenses by date and category
  const groupedExpenses = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date).toLocaleDateString();
    if (!acc[date]) acc[date] = {};
    if (!acc[date][expense.category])
      acc[date][expense.category] = { amount: 0, purposes: [] };

    acc[date][expense.category].amount += expense.amount;
    acc[date][expense.category].purposes.push(expense.purpose);
    return acc;
  }, {});

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="summary-page">
      <h2>Expense Summary</h2>

      <table className="summary-table">
        <thead>
          <tr>
            <th>Date</th>
            {categories.map((category) => (
              <th key={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedExpenses).map(([date, categoriesData]) => (
            <tr key={date}>
              <td>{date}</td>
              {categories.map((category) => {
                const expense = categoriesData[category];
                return (
                  <td
                    key={`${date}-${category}`}
                    title={
                      expense
                        ? `Purposes: ${expense.purposes.join(", ")}`
                        : "No expenses for this category"
                    }
                  >
                    {expense ? `$${expense.amount.toFixed(2)}` : "-"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Summary;
