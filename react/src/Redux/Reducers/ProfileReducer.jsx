import { createSlice } from "@reduxjs/toolkit";
import { TOKEN_AUTHOR, getDataTextStorage } from "../../Util/UtilFunction";

const initialState = {
  profileInfo: {},
};

const ProfileReducer = createSlice({
  name: "ProfileReducer",
  initialState,
  reducers: {
    setInfoProfile: (state, action) => {
      state.profileInfo = action.payload;
    },
  },
});

export const { setInfoProfile } = ProfileReducer.actions;

export default ProfileReducer.reducer;

//---------API Call-------------
export const GetInfoProfileActionAsync = () => {
  return async (dispatch) => {
    try {
      const token = getDataTextStorage(TOKEN_AUTHOR);
      const res = await axios.post(
        "https://apistore.cybersoft.edu.vn/api/Users/getProfile", null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "accept": "application/json",
          },
        }
      );
      console.log(res.data.content);
      const action = setInfoProfile(res.data.content);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};


export const UpdateProfileActionAsync = (updateProfileData) => {
  return async (dispatch) => {
    try {
      const token = getDataTextStorage(TOKEN_AUTHOR);
      const res = await axios.post(
        "https://apistore.cybersoft.edu.vn/api/Users/updateProfile",updateProfileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data.content);
      const action = GetInfoProfileActionAsync();
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};
