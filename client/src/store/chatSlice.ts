import { createSlice } from "@reduxjs/toolkit";
import { ChatMessageInfo } from "../serverService/models/chatMessageInfoModel";

const initialState: Array<ChatMessageInfo> = []

const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    newMessage(state, action) {
      state.push(action.payload);
    },
    resetChat() {
      return initialState;
    }
  }
})

export default chatSlice.reducer;
export const {newMessage, resetChat} = chatSlice.actions;