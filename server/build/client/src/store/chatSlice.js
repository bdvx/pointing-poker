"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetChat = exports.newMessage = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = [];
const chatSlice = toolkit_1.createSlice({
    name: "chatSlice",
    initialState,
    reducers: {
        newMessage(state, action) {
            state.push(action.payload);
        },
        resetChat() {
            return initialState;
        }
    }
});
exports.default = chatSlice.reducer;
_a = chatSlice.actions, exports.newMessage = _a.newMessage, exports.resetChat = _a.resetChat;
//# sourceMappingURL=chatSlice.js.map