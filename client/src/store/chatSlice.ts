import { createSlice } from "@reduxjs/toolkit";
import { TechnicalMessageProps } from "../components/Chat/TechnicalMessage/TechnicalMessage";
import { ChatMessageInfo } from "../serverService/models/chatMessageInfoModel";

const initialState: Array<ChatMessageInfo | TechnicalMessageProps> = []

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