"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.dataSelectActions = void 0;

var _toolkit = require("@reduxjs/toolkit");

var dataSelectSlice = (0, _toolkit.createSlice)({
  name: "sweetType",
  initialState: {
    dataType: ""
  },
  reducers: {
    setDataType: function setDataType(state, action) {
      state.dataType = action.payload;
    }
  }
});
var dataSelectActions = dataSelectSlice.actions;
exports.dataSelectActions = dataSelectActions;
var _default = dataSelectSlice;
exports["default"] = _default;