import { createSlice } from "@reduxjs/toolkit";

const dataSweetSlice = createSlice({
  name: "dataSweets",
  initialState: {
    sweetData: {},
    sweetsData: [],
  },
  reducers: {
    // setting all the sweets in the store
    setSweetsData(state, action) {
      state.sweetsData = action.payload;
    },
    // set a single sweet in the store
    setSweetData(state, action) {
      state.sweetData = action.payload;
    },
    // remove a single sweet in the store
    removeSweetData(state, action) {
      const { _id } = action.payload;
      state.sweetsData = state.sweetsData.filter((sweet) => sweet._id !== _id);
    },
    // update sweet ingredients of a single sweet in the store
    updateSweetIngredients(state, action) {
      state.sweetData.ingredients = action.payload.ingredients;
    },
    // update sweet Quantity of a single element in the store
    updateSweetQuantity(state, action) {
      const { _id, sweetQuantity } = action.payload;
      console.log(action.payload);
      console.log(_id, sweetQuantity);
      // finding the index of the element
      const index = state.sweetsData.findIndex((sweet) => sweet._id === _id);
      // if there is
      if (index !== -1) {
        // add the quantity
        const newQuantity =
          state.sweetsData[index].sweetQuantity + sweetQuantity;
        // Ensure that updateQuantity is not less than 0
        state.sweetsData[index].sweetQuantity =
          newQuantity >= 0 ? newQuantity : 0;
      }
    },
    // reset a single sweet from the store
    resetSweetData(state) {
      state.sweetData = {};
    },
  },
});

export const dataSweetActions = dataSweetSlice.actions;
export default dataSweetSlice;
