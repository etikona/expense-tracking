import { configureStore } from "@reduxjs/toolkit";
// import limitReducer from "./slice/limitSlice";
import limitReducer from "./slice/limitsSlice";
import expensesReducer from "./slice/expensesSlice";

export const store = configureStore({
  reducer: {
    limits: limitReducer,
    expenses: expensesReducer,
  },
});
