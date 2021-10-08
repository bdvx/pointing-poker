import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../serverService/models/userInfoModel";

const initialState: UserInfo = {
  firstName: '',
  lastName: '',
  jobPosition: '',
  login: '',
  avatar: '',
  isLogin: false,
  isScrum: false
}

const currentUserSlice = createSlice({
  name: "currentUserStore",
  initialState,
  reducers: {
    setUserInfo(state, action) {
      return action.payload;
    },
    setScrumStatus(state, action) {
      state.isScrum = action.payload;
    },
    setCurrentUserScrumStatus(state) {
      state.isScrum = true;
    }
  }
})

export default currentUserSlice.reducer;
export const {setUserInfo, setScrumStatus, setCurrentUserScrumStatus} = currentUserSlice.actions;
