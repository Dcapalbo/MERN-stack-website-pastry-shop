import { createSlice } from "@reduxjs/toolkit";

const dataSweetSlice = createSlice({
  name: "dataSweets",
  initialState: {
    sweetData: {},
    sweetsData: [],
  },
  reducers: {
    setSweetsData(state, action) {
      state.sweetsData = action.payload;
    },
    setSweetData(state, action) {
      state.sweetData = action.payload;
    },
    removeSweetData(state, action) {
      state.sweetsData = state.sweetsData.filter(
        (sweet) => sweet._id !== action.payload._id
      );
    },
    resetSweetData(state) {
      state.sweetData = {};
    },
  },
});

export const dataSweetActions = dataSweetSlice.actions;
export default dataSweetSlice;
