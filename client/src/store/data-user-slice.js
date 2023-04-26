import { createSlice } from "@reduxjs/toolkit";

const dataUserSlice = createSlice({
  name: "userLogin",
  initialState: {
    isLoggedIn: false,
    userName: null,
    userId: null,
    token: null,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.userName = action.payload.userName;
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userName = null;
      state.userId = null;
      state.token = null;
    },
  },
});

export const dataUserActions = dataUserSlice.actions;
export default dataUserSlice;
