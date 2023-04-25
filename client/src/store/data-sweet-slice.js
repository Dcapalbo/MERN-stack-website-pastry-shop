import { createSlice } from "@reduxjs/toolkit";

const dataSweetSlice = createSlice({
  name: "dataSweet",
  initialState: {
    sweetData: {},
    sweetsData: [],
  },
  reducers: {
    setContactsData(state, action) {
      state.sweetsData = action.payload;
    },
    setContactData(state, action) {
      state.sweetData = action.payload;
    },
    addContactData(state, action) {
      state.sweetsData.push(action.payload);
    },
    removeContactData(state, action) {
      state.sweetsData = state.sweetsData.filter(
        (sweet) => sweet._id !== action.payload._id
      );
    },
    resetContactData(state) {
      state.sweetData = {};
    },
  },
});

export const dataSweetActions = dataSweetSlice.actions;
export default dataSweetSlice;
