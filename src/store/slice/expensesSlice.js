import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async (expenseData) => {
    const response = await fetch(
      "https://expense-back-f70o.onrender.com/api/expenses",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expenseData),
      }
    );
    return response.json();
  }
);

const expenseSlice = createSlice({
  name: "expenses",
  initialState: { items: [], limits: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addExpense.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
  },
});

export default expenseSlice.reducer;
