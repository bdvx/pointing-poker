"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const redux_1 = require("redux");
const chatSlice_1 = require("./chatSlice");
const currentUserSlice_1 = require("./currentUserSlice");
const gameSlice_1 = require("./gameSlice");
const roomSlice_1 = require("./roomSlice");
const votingSlice_1 = require("./votingSlice");
const rootReducer = redux_1.combineReducers({
    userInfo: currentUserSlice_1.default,
    roomInfo: roomSlice_1.default,
    chat: chatSlice_1.default,
    voting: votingSlice_1.default,
    game: gameSlice_1.default
});
exports.store = toolkit_1.configureStore({
    reducer: rootReducer,
});
//# sourceMappingURL=rootReducer.js.map