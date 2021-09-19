import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import chatSlice from "./chatSlice";
import currentUserSlice from "./currentUserSlice";
import roomSlice from "./roomSlice";

const rootReducer = combineReducers({
  userInfo: currentUserSlice,
  roomInfo: roomSlice,
  chat: chatSlice
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>