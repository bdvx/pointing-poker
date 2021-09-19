import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import chatSlice from "./chatSlice";
import currentUserSlice from "./currentUserSlice";
import roomSlice from "./roomSlice";
import voitingSlice from "./voitingSlice";

const rootReducer = combineReducers({
  userInfo: currentUserSlice,
  roomInfo: roomSlice,
  chat: chatSlice,
  voiting: voitingSlice
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>