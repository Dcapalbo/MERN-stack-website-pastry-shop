import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dataSweetSlice from "./data-sweet-slice";
import dataSelectSlice from "./data-select-slice";
import userLoginSlice from "./data-user-slice";

const rootReducer = combineReducers({
  dataSweets: dataSweetSlice.reducer,
  dataType: dataSelectSlice.reducer,
  userLogin: userLoginSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export { store };
