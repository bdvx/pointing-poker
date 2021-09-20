import { createSlice } from "@reduxjs/toolkit";
import { GameModel } from "../serverService/models/gameModel";

const initialState:GameModel = {
  issues: []
}

const gameSlice = createSlice({
  name: "gameSlice",
  initialState,
  reducers: {
    setGame(state, action) {
      return action.payload;
    },
    resetGame() {
      return initialState;
    }
  }
})

export default gameSlice.reducer;
export const {setGame, resetGame} = gameSlice.actions;