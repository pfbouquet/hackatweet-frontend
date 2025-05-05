import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const trendsDataSlice = createSlice({
  name: "trendsData",
  initialState,
  reducers: {
    setTrendsData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setTrendsData } = trendsDataSlice.actions;
export default trendsDataSlice.reducer;
