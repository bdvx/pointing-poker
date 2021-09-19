import { createSlice } from "@reduxjs/toolkit";
import { Room } from "../serverService/models/roomModel";

const initialState: Room = {
  players: [],
  roomId: '',
  roomUrl: '',
  chat: [],
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
  name: "main",
  initialState,
  reducers: {
    setRoomInfo(state, action) {
      return action.payload;
    },
    addNewUserToRoom(state, action) {
      state.players.push(action.payload);
    },
    addNewMessage(state, action) {
      state.chat.push(action.payload);
    },
    deleteUser(state, action) {
      const index = state.players.findIndex(player => player.login === action.payload);
      if (index !== -1) {
        state.players.splice(index, 1);
      }
    },
    resetRoomInfo() {
      return initialState;
    }
  }
})

export default roomSlice.reducer;
export const {setRoomInfo, addNewUserToRoom, addNewMessage, deleteUser, resetRoomInfo} = roomSlice.actions;
