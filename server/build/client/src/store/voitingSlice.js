"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVoit = exports.updateVoits = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = [];
const voitingSlice = toolkit_1.createSlice({
    name: "voitingSlice",
    initialState,
    reducers: {
        updateVoits(state, action) {
            state.push(action.payload);
        },
        deleteVoit(state, action) {
            const index = state.findIndex((voit) => voit.whoKick === action.payload);
            state.splice(index, 1);
            //! Проверить на работоспособность
        }
    }
});
exports.default = voitingSlice.reducer;
_a = voitingSlice.actions, exports.updateVoits = _a.updateVoits, exports.deleteVoit = _a.deleteVoit;
//# sourceMappingURL=voitingSlice.js.map