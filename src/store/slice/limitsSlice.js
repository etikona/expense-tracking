"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  spendingLimits: {
    groceries: 0,
    transportation: 0,
    healthcare: 0,
    utility: 0,
    charity: 0,
    miscellaneous: 0,
  },
};

const limitSlice = createSlice({
  name: "limit",
  initialState,
  reducers: {
    setLimit: (state, action) => {
      const { category, limit } = action.payload;
      state.spendingLimits[category] = limit;
    },
    resetLimits: (state) => {
      state.spendingLimits = initialState.spendingLimits;
    },
  },
});

export const { setLimit, resetLimits } = limitSlice.actions;
export default limitSlice.reducer;
