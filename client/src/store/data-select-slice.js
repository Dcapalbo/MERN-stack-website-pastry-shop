import { createSlice } from "@reduxjs/toolkit";

const dataSelectSlice = createSlice({
  name: "dataCategory",
  initialState: {
    category: "",
  },
  reducers: {
    setDataCategory(state, action) {
      state.category = action.payload;
    },
  },
});

export const dataSelectActions = dataSelectSlice.actions;
export default dataSelectSlice;
