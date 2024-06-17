import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/userReducer";
export const store = configureStore({
  reducer: {
    number: (state = 1) => state,
    userReducer,
  },
});
