import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const kickDataSlice = createSlice({
  name: "kickData",
  initialState,
  reducers: {
    setKickData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setKickData } = kickDataSlice.actions;
export default kickDataSlice.reducer;
