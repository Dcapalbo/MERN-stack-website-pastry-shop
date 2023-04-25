import { createSlice } from "@reduxjs/toolkit";

const dataSelectSlice = createSlice({
  name: "sweetType",
  initialState: {
    dataType: "",
  },
  reducers: {
    setDataType(state, action) {
      state.dataType = action.payload;
    },
  },
});

export const dataSelectActions = dataSelectSlice.actions;
export default dataSelectSlice;
