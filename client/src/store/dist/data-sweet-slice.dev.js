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
    // update sweet ingredients of a single sweet in the store
    updateSweetIngredients: function updateSweetIngredients(state, action) {
      state.sweetData.ingredients = action.payload.ingredients;
    },
    // update sweet Quantity of a single element in the store
    updateSweetQuantity: function updateSweetQuantity(state, action) {
      var _action$payload = action.payload,
          _id = _action$payload._id,
          sweetQuantity = _action$payload.sweetQuantity; // finding the index of the element

      var index = state.sweetsData.findIndex(function (sweet) {
        return sweet._id === _id;
      }); // if there is

      if (index !== -1) {
        // add the quantity
        var newQuantity = state.sweetsData[index].sweetQuantity + sweetQuantity; // Ensure that updateQuantity is not less than 0

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