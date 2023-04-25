"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.dataUserActions = void 0;

var _toolkit = require("@reduxjs/toolkit");

var dataUserSlice = (0, _toolkit.createSlice)({
  name: "userLogin",
  initialState: {
    isLoggedIn: false,
    userEmail: null,
    userId: null,
    token: null
  },
  reducers: {
    login: function login(state, action) {
      state.isLoggedIn = true;
      state.userEmail = action.payload.userEmail;
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    }
  }
});
var dataUserActions = dataUserSlice.actions;
exports.dataUserActions = dataUserActions;
var _default = dataUserSlice;
exports["default"] = _default;