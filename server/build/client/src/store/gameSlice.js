"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetGame = exports.setGame = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    isVoting: false,
    issuesInfo: [],
    players: [],
};
const gameSlice = toolkit_1.createSlice({
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
});
exports.default = gameSlice.reducer;
_a = gameSlice.actions, exports.setGame = _a.setGame, exports.resetGame = _a.resetGame;
//# sourceMappingURL=gameSlice.js.map