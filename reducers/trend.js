import { createSlice } from "@reduxjs/toolkit";

const BACKEND_URL = "http://localhost:3000";

const initialState = {
  value: "",
};

export const trendSlice = createSlice({
  name: "trend",
  initialState,
  reducers: {
    clickTrend:(state,action) => {
        state.value = action.payload
        console.log("reducer trend modified")
    }
  },
});

export const { clickTrend } = trendSlice.actions;
export default trendSlice.reducer;
