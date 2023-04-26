"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.dataSweetActions = void 0;

var _toolkit = require("@reduxjs/toolkit");

var dataSweetSlice = (0, _toolkit.createSlice)({
  name: "dataSweet",
  initialState: {
    sweetData: {},
    sweetsData: []
  },
  reducers: {
    setSweetsData: function setSweetsData(state, action) {
      state.sweetsData = action.payload;
    },
    setSweetData: function setSweetData(state, action) {
      state.sweetData = action.payload;
    },
    addSweetData: function addSweetData(state, action) {
      state.sweetsData.push(action.payload);
    },
    removeSweetData: function removeSweetData(state, action) {
      state.sweetsData = state.sweetsData.filter(function (sweet) {
        return sweet._id !== action.payload._id;
      });
    },
    resetContactData: function resetContactData(state) {
      state.sweetData = {};
    }
  }
});
var dataSweetActions = dataSweetSlice.actions;
exports.dataSweetActions = dataSweetActions;
var _default = dataSweetSlice;
exports["default"] = _default;