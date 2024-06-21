import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: []

}

const CartReducer = createSlice({
  name: "CartReducer",
  initialState,
  reducers: {}
});

export const {} = CartReducer.actions

export default CartReducer.reducer