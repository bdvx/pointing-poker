import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import chatSlice from "./chatSlice";
import currentUserSlice from "./currentUserSlice";
import gameSlice from "./gameSlice";
import roomSlice from "./roomSlice";
import settingsSlice from "./settingsSlice";
import votingSlice from "./votingSlice";

const rootReducer = combineReducers({
  userInfo: currentUserSlice,
  roomInfo: roomSlice,
  chat: chatSlice,
  voting: votingSlice,
  game: gameSlice,
  settings: settingsSlice,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>