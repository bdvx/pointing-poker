import { createSlice } from "@reduxjs/toolkit";
import { Room } from "../serverService/models/roomModel";

const initialState: Room = {
  players: [],
  roomId: ''
}

const roomSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setRoomInfo(state, action) {
      state = action.payload;
    }
  }
})

export default roomSlice.reducer;
export const {setRoomInfo} = roomSlice.actions;
