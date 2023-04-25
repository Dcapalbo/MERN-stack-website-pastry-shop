import { createSlice } from "@reduxjs/toolkit";

const dataUserSlice = createSlice({
  name: "userLogin",
  initialState: {
    isLoggedIn: false,
    userEmail: null,
    userId: null,
    token: null,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.userEmail = action.payload.userEmail;
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },
  },
});

export const dataUserActions = dataUserSlice.actions;
export default dataUserSlice;
