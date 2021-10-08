import { createSlice } from "@reduxjs/toolkit";
import { VotingModel } from "../serverService/models/votingModel";

const initialState: Array<VotingModel> = []

const votingSlice = createSlice({
  name: "votingSlice",
  initialState,
  reducers: {
    updateVoits(state, action) {
      return action.payload;
    },
    resetVoits() {
      return initialState;
    }
  }
})

export default votingSlice.reducer;
export const {updateVoits, resetVoits} = votingSlice.actions;