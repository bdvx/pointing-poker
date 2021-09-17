import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../serverService/models/userInfoModel";

const initialState: UserInfo = {
  firstName: '',
  lastName: '',
  jobPosition: '',
  login: '',
  avatar: ''
}

const currentUserSlice = createSlice({
  name: "currentUserStore",
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state = action.payload;
    }
  }
})

export default currentUserSlice.reducer;
export const {setUserInfo} = currentUserSlice.actions;
