"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetRoomInfo = exports.setRoomInfo = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    players: [],
    queue: [],
    inGame: [],
    roomId: '',
    roomUrl: '',
    isPlaying: false,
    isVoting: false,
    amountAgreeWithKick: 1,
    scrumInfo: {
        firstName: '',
        isScrum: true,
        jobPosition: '',
        lastName: '',
        login: '',
        avatar: ''
    }
};
const roomSlice = toolkit_1.createSlice({
    name: "roomSlice",
    initialState,
    reducers: {
        setRoomInfo(state, action) {
            return action.payload;
        },
        resetRoomInfo() {
            return initialState;
        }
    }
});
exports.default = roomSlice.reducer;
_a = roomSlice.actions, exports.setRoomInfo = _a.setRoomInfo, exports.resetRoomInfo = _a.resetRoomInfo;
//# sourceMappingURL=roomSlice.js.map