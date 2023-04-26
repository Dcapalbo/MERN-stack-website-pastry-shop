import { createSlice } from "@reduxjs/toolkit";

const dataSelectSlice = createSlice({
  name: "sweetCategory",
  initialState: {
    category: "",
  },
  reducers: {
    setSweetCategory(state, action) {
      state.category = action.payload;
    },
  },
});

export const dataSelectActions = dataSelectSlice.actions;
export default dataSelectSlice;
