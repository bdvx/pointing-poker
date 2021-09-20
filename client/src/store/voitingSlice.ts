import { createSlice } from "@reduxjs/toolkit";
import { VoitingModel } from "../serverService/models/voitingModel";

const initialState: Array<VoitingModel> = []

const voitingSlice = createSlice({
  name: "voitingSlice",
  initialState,
  reducers: {
    updateVoits(state, action) {
      state.push(action.payload);
    },
    deleteVoit(state, action) {
      const index = state.findIndex((voit) => voit.whoKick === action.payload)
      state.splice(index, 1);
      //! Проверить на работоспособность
    }
  }
})

export default voitingSlice.reducer;
export const {updateVoits, deleteVoit} = voitingSlice.actions;