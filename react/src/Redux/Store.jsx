import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./Reducers/ProductReducer";

export const store = configureStore({
  reducer: ProductReducer
});
