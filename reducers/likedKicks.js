import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const likedKicksSlice = createSlice({
  name: "likedKicks",
  initialState,
  reducers: {
    setLikedKicks: async (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setLikedKicks } = likedKicksSlice.actions;
export default likedKicksSlice.reducer;
