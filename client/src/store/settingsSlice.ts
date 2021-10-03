import { createSlice } from "@reduxjs/toolkit";
import { VotingModel } from "../serverService/models/votingModel";

export interface SettingsModel {
  roundTime:number,
  timerNeeded: boolean,
  autoTurn: boolean,
  masterAsPlayer: boolean,
  scoreType: string,
  shortScoreType: string,
  cards: Array<string>
}

const initialState:SettingsModel = {
  roundTime: 140,
  timerNeeded: true,
  autoTurn: true,
  masterAsPlayer: false,
  scoreType: "Story Points",
  shortScoreType: "SP",
  cards: [
    "1","2","3","5","8","13","21","inf"
  ]
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
    addCard(state, action) {
      state.cards.push(action.payload);
    },
    updateCard(state, action) {
      const index = state.cards.findIndex((cardValue) => cardValue === action.payload.currentValue)
      if(index) {
        state.cards[index] = action.payload.value;
      }
    },
    setCardType(state, action) {
      state.shortScoreType = action.payload;
    },
    deleteSettings() {
      return initialState;
    }
  }
})

export default settingsSlice.reducer;
export const {setSettings, deleteSettings, setTimer, addCard, updateCard, setCardType} = settingsSlice.actions;
