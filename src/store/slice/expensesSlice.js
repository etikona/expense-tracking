import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
    updateExpense: (state, action) => {
      const { id, updatedExpense } = action.payload;
      const index = state.expenses.findIndex((expense) => expense.id === id);
      if (index !== -1) {
        state.expenses[index] = { ...state.expenses[index], ...updatedExpense };
      }
    },
    removeExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      );
    },
  },
});

export const { addExpense, updateExpense, removeExpense } =
  expensesSlice.actions;
export default expensesSlice.reducer;
