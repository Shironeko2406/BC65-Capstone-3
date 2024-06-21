import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import {
  TOKEN_AUTHOR,
  USER_LOGIN,
  getDataJSONStorage,
  getDataTextStorage,
  setCookie,
  setDataJSONStorage,
  setDataTextStorage,
} from "../../Util/UtilFunction";
const initialState = {
  userLogin: getDataJSONStorage(USER_LOGIN),
  userInfo: {
    email: "",
    password: "",
    name: "",
    gender: true,
    phone: "",
  },
};

const UsersReducer = createSlice({
  name: "UsersReducer",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.userLogin = action.payload;
    },
    signupAction: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { loginAction, signupAction } = UsersReducer.actions;

export default UsersReducer.reducer;

// Action Thunk

//----------------- Đăng nhập-------------------
export const loginActionApi = (email, password) => {
  return async (dispatch) => {
    console.log(email, password);
    try {
      const res = await axios.post(
        "https://apistore.cybersoft.edu.vn/api/Users/signin",
        { email, password }
      );
      message.success("Đăng nhập thành công!");
      const loginAct = loginAction(res.data.content);
      dispatch(loginAct);
      setDataJSONStorage(USER_LOGIN, res.data.content);
      setDataTextStorage(TOKEN_AUTHOR, res.data.content.accessToken);
      setCookie(TOKEN_AUTHOR, res.data.content.accessToken);
    } catch (error) {
      message.error("Đăng nhập thất bại:" + error.message);
    }
  };
};

//----------------- Đăng kí-------------------
export const signupActionApi = (signupInfo) => {
  return async (dispatch) => {
    try {
      console.log(signupInfo);
      const res = await axios.post(
        "https://apistore.cybersoft.edu.vn/api/Users/signup",
        signupInfo
      );
      message.success("Đăng kí thành công!");
      console.log(res);
      const signup = signupAction(res.data.content);
      dispatch(signup);
    } catch (error) {
      message.error("Đăng kí thất bại:" + error.message);
    }
  };
};

//----------------- Cập nhập profile-------------------
export const updateProfileActionApi = (updateData) => {
  return async (dispatch) => {
    try {
      const token = getDataTextStorage(TOKEN_AUTHOR);
      const res = await axios.post(
        "https://apistore.cybersoft.edu.vn/api/Users/updateProfile",
        updateData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      message.success("Cập nhập thành công!");
    } catch (error) {
      message.error("Cập nhập thất bại:" + error.message);
    }
  };
};
