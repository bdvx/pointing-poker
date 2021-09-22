"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let clientDispatch;
function setDispatch(dispatch) {
    clientDispatch = dispatch;
}
function getUserByLogin(room, userlogin) {
    const user = room.players.find((player) => player.login == userlogin);
    return user;
}
const clientService = {
    setDispatch,
    getUserByLogin
};
exports.default = clientService;
//# sourceMappingURL=clientService.js.map