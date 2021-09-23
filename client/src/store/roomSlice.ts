import { createSlice } from "@reduxjs/toolkit";
import { Room } from "../serverService/models/roomModel";

const initialState: Room = {
  players: [],
  queue: [],
  inGame: [],
  roomId: '',
  roomUrl: '',
  isPlaying: false,
  isVoting:false,
  amountAgreeWithKick: 1,
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
