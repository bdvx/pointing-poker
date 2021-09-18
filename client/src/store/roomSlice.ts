import { createSlice } from "@reduxjs/toolkit";
import { Room } from "../serverService/models/roomModel";

const initialState: Room = {
  players: [],
  roomId: '',
  roomUrl:''
}

const roomSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setRoomInfo(state, action) {
      console.log('roomSlice')
      return action.payload;
    },
    addNewUserToRoom(state, action) {
      state.players.push(action.payload);
    }
  }
})

export default roomSlice.reducer;
export const {setRoomInfo, addNewUserToRoom} = roomSlice.actions;
