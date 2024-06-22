import { createSlice } from '@reduxjs/toolkit'
import { clearCart } from './CartReducer';

const initialState = {
    OrderList: []
}

const OderReducer = createSlice({
  name: "OderReducer",
  initialState,
  reducers: {}
});

export const {} = OderReducer.actions

export default OderReducer.reducer

//-------API Call------------
export const CreateOrderActionAsync = (dataOrder) => {
    return async (dispatch) => {
      try {
        const res = await axios.post(
          "https://apistore.cybersoft.edu.vn/api/Users/order", dataOrder
        );
        console.log(res.data.content);
        const action = clearCart()
        dispatch(action)
      } catch (error) {
        console.error(error);
      }
    };
  };