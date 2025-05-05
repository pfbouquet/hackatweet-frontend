import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const kicksDataSlice = createSlice({
  name: "kicksData",
  initialState,
  reducers: {
    setKicksData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setKicksData } = kicksDataSlice.actions;
export default kicksDataSlice.reducer;
