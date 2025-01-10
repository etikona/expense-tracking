import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// *Fetch limits from the backend
export const getLimits = createAsyncThunk("limits/getLimits", async () => {
  const response = await axios.get(
    "https://expense-back-f70o.onrender.com/api/limits"
  );
  console.log(response.data);
  return response.data;
});

// *Set a limit for a category
export const setLimit = createAsyncThunk("limits/setLimit", async (data) => {
  const response = await axios.post(
    "https://expense-back-f70o.onrender.com/api/limits",
    data
  );
  return response.data;
});

const limitsSlice = createSlice({
  name: "limits",
  initialState: { limits: {}, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLimits.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLimits.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.limits = action.payload;
      })
      .addCase(getLimits.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(setLimit.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setLimit.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.limits[action.meta.arg.category] = action.meta.arg.limit;
      })
      .addCase(setLimit.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default limitsSlice.reducer;
