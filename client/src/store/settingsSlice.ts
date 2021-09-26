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
    deleteSettings() {
      return initialState;
    }
  }
})

export default settingsSlice.reducer;
export const {setSettings, deleteSettings} = settingsSlice.actions;
