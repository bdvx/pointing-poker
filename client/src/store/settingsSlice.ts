import { createSlice } from "@reduxjs/toolkit";
import { VotingModel } from "../serverService/models/votingModel";

export interface SettingsModel {
  roundTime:number,
}

const initialState:SettingsModel = {
  roundTime: 0,
}

const settingsSlice = createSlice({
  name: "settingsSlice",
  initialState,
  reducers: {
    setSettings(state, action) {
      return action.payload;
    },
    setTimer(state, action) {
      state.roundTime = action.payload;
    },
    deleteSettings() {
      return initialState;
    }
  }
})

export default settingsSlice.reducer;
export const {setSettings, deleteSettings, setTimer} = settingsSlice.actions;
