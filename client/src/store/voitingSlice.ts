import { createSlice } from "@reduxjs/toolkit";
import { voitingModel } from "../serverService/models/voitingModel";

const initialState: Array<voitingModel> = []

const voitingSlice = createSlice({
  name: "voitingSlice",
  initialState,
  reducers: {
    updateVoiting(state, action) {
      return action.payload;
    },
    resetVoiting() {
      return initialState;
    }
  }
})

export default voitingSlice.reducer;
export const {updateVoiting, resetVoiting} = voitingSlice.actions;