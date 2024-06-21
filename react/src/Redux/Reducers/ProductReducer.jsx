import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  detailProductById: null,
};

const ProductReducer = createSlice({
  name: "ProductReducer",
  initialState,
  reducers: {
    setProductList: (state, action) => {
      state.productList = action.payload;
    },
    setDetailProductById: (state, action) => {
      state.detailProductById = action.payload;
    },
  },
});

export const { setProductList, setDetailProductById } = ProductReducer.actions;

export default ProductReducer.reducer;

//---------API Call----------------
export const GetProductListActionAsync = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        "https://apistore.cybersoft.edu.vn/api/Product"
      );
      console.log(res.data.content);
      const action = setProductList(res.data.content);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};

export const GetProductByIdActionAsync = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `https://apistore.cybersoft.edu.vn/api/Product/getbyid?id=${id}`
      );
      console.log(res.data.content);
      const action = setDetailProductById(res.data.content);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};
