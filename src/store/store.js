"use client";
import { configureStore } from "@reduxjs/toolkit";
// import limitReducer from "./slice/limitSlice";
import limitReducer from "./slice/limitsSlice";
import expensesReducer from "./slice/expensesSlice";

const store = configureStore({
  reducer: {
    limit: limitReducer,
    expenses: expensesReducer,
  },
});

export default store;
