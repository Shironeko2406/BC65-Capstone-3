import { configureStore } from "@reduxjs/toolkit";

import ProductReducer from "./Reducers/ProductReducer";
import UsersReducer from "./Reducers/UsersReducer";

export const store = configureStore({
  reducer: {
    ProductReducer, UsersReducer
  }

});
