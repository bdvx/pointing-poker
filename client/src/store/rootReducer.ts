import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import currentUserSlice from "./currentUserSlice";

const rootReducer = combineReducers({
  userInfo: currentUserSlice
})

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>