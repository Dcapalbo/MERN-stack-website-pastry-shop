"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.dataSweetActions = void 0;

var _toolkit = require("@reduxjs/toolkit");

var dataSweetSlice = (0, _toolkit.createSlice)({
  name: "dataSweets",
  initialState: {
    sweetData: {},
    sweetsData: []
  },
  reducers: {
    // setting all the sweets in the store
    setSweetsData: function setSweetsData(state, action) {
      state.sweetsData = action.payload;
    },
    // set a single sweet in the store
    setSweetData: function setSweetData(state, action) {
      state.sweetData = action.payload;
    },
    // remove a single sweet in the store
    removeSweetData: function removeSweetData(state, action) {
      var _id = action.payload._id;
      state.sweetsData = state.sweetsData.filter(function (sweet) {
        return sweet._id !== _id;
      });
    },
    // update sweet Quantity
    updateSweetQuantity: function updateSweetQuantity(state, action) {
      var _action$payload = action.payload,
          _id = _action$payload._id,
          sweetQuantity = _action$payload.sweetQuantity;
      console.log(action.payload);
      console.log(_id, sweetQuantity);
      var index = state.sweetsData.findIndex(function (sweet) {
        return sweet._id === _id;
      });

      if (index !== -1) {
        var newQuantity = state.sweetsData[index].sweetQuantity + sweetQuantity;
        state.sweetsData[index].sweetQuantity = newQuantity >= 0 ? newQuantity : 0;
      }
    },
    // reset a single sweet from the store
    resetSweetData: function resetSweetData(state) {
      state.sweetData = {};
    }
  }
});
var dataSweetActions = dataSweetSlice.actions;
exports.dataSweetActions = dataSweetActions;
var _default = dataSweetSlice;
exports["default"] = _default;