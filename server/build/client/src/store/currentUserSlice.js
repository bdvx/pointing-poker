"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setScrumStatus = exports.setUserInfo = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    firstName: '',
    lastName: '',
    jobPosition: '',
    login: '',
    avatar: '',
    isLogin: false,
    isScrum: false
};
const currentUserSlice = toolkit_1.createSlice({
    name: "currentUserStore",
    initialState,
    reducers: {
        setUserInfo(state, action) {
            return action.payload;
        },
        setScrumStatus(state, action) {
            state.isScrum = action.payload;
        }
    }
});
exports.default = currentUserSlice.reducer;
_a = currentUserSlice.actions, exports.setUserInfo = _a.setUserInfo, exports.setScrumStatus = _a.setScrumStatus;
//# sourceMappingURL=currentUserSlice.js.map