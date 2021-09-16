import { createSlice } from "@reduxjs/toolkit";

const initialState: CurrentUserModel = {
  firstName: '',
  lastName: '',
  jobPosition: '',
  login: '',
  avatar: ''
}

const currentUserSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state = action.payload;
    }
  }
})

export default currentUserSlice.reducer;
export const {setUserInfo} = currentUserSlice.actions;
export interface CurrentUserModel {
  firstName: '',
  lastName: '',
  jobPosition: '',
  login: '',
  avatar: ''
}