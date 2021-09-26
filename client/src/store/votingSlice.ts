import { createSlice } from "@reduxjs/toolkit";
import { VotingModel } from "../serverService/models/votingModel";

const initialState: Array<VotingModel> = []

const votingSlice = createSlice({
  name: "votingSlice",
  initialState,
  reducers: {
    updateVoits(state, action) {
      state.push(action.payload);
    },
    deleteVoit(state, action) {
      const index = state.findIndex((vote) => vote.whoKick === action.payload)
      state.splice(index, 1);
    }
  }
})

export default votingSlice.reducer;
export const {updateVoits, deleteVoit} = votingSlice.actions;