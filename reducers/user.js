import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { token: null, username: null, firstname: null, likedKicks: [] },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      state.value.firstname = action.payload.firstname;
      state.value.likedKicks = action.payload.likedKicks;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      state.value.firstname = null;
      state.value.likedKicks = [];
    },
    refresh: (state) => {
      fetch(`${BACKEND_URL}/users/${user.token}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            state.value = data.user;
          }
        });
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
