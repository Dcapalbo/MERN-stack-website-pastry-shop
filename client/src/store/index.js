import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import dataSweetSlice from "./data-sweet-slice";
import dataSelectSlice from "./data-select-slice";
import userLoginSlice from "./data-user-slice";

const rootReducer = combineReducers({
  dataSweets: dataSweetSlice.reducer,
  dataType: dataSelectSlice.reducer,
  userLogin: userLoginSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
