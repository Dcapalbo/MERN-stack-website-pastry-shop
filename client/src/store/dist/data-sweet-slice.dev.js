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
    setContactsData: function setContactsData(state, action) {
      state.sweetsData = action.payload;
    },
    setContactData: function setContactData(state, action) {
      state.sweetData = action.payload;
    },
    addContactData: function addContactData(state, action) {
      state.sweetsData.push(action.payload);
    },
    removeContactData: function removeContactData(state, action) {
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