import { createSlice } from "@reduxjs/toolkit";
import { VotingModel } from "../serverService/models/votingModel";

export interface SettingsModel {
  roundTime:number,
  timerNeeded: boolean,
  autoTurn: boolean,
  masterAsPlayer: boolean,
  scoreType: string,
  shortScoreType: string
}

const initialState:SettingsModel = {
  roundTime: 0,
  timerNeeded: true,
  autoTurn: true,
  masterAsPlayer: false,
  scoreType: "Story Points",
  shortScoreType: "SP"
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
