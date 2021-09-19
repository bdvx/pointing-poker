import { createSlice } from "@reduxjs/toolkit";
import { Room } from "../serverService/models/roomModel";

const initialState: Room = {
  players: [],
  roomId: '',
  roomUrl: '',
  isPlaying: false,
  scrumInfo: {
    firstName: '',
    isScrum: true,
    jobPosition: '',
    lastName: '',
    login: '',
    avatar: ''
  }
}

const roomSlice = createSlice({
  name: "roomSlice",
  initialState,
  reducers: {
    setRoomInfo(state, action) {
      return action.payload;
    },
    resetRoomInfo() {
      return initialState;
    }
  }
})

export default roomSlice.reducer;
export const {setRoomInfo, resetRoomInfo} = roomSlice.actions;
