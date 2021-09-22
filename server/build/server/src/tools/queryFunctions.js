"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeWSResponseMessage = exports.transformServerGameToClient = exports.transformServerRoomToClient = exports.sendUpdatedGame = exports.sendUpdatedRoom = void 0;
function sendUpdatedRoom(room, ws) {
    const roomToClient = transformServerRoomToClient(room);
    const response = makeWSResponseMessage("UPDATE_ROOM", roomToClient);
    ws.send(response);
}
exports.sendUpdatedRoom = sendUpdatedRoom;
function sendUpdatedGame(room, ws) {
    if (room.game) {
        const gameToClient = transformServerGameToClient(room.game);
        const response = makeWSResponseMessage("UPDATE_GAME", gameToClient);
        ws.send(response);
    }
}
exports.sendUpdatedGame = sendUpdatedGame;
function transformServerRoomToClient(serverRoom) {
    const { isPlaying, roomId, roomUrl, scrumInfo, issues } = serverRoom;
    const clientRoom = {
        isPlaying, roomId, roomUrl, scrumInfo, issues,
        players: serverRoom.playersWS.map((playerWs) => playerWs.userInfo),
        inGame: serverRoom.inGame.map((player) => player.userInfo),
        queue: serverRoom.queue.map((player) => player.userInfo)
    };
    return clientRoom;
}
exports.transformServerRoomToClient = transformServerRoomToClient;
function transformServerGameToClient(serverGame) {
    const { isVoting, issuesInfo, players } = serverGame;
    const clientGame = {
        isVoting, issuesInfo,
        players: players.map((player) => player.userInfo),
    };
    return clientGame;
}
exports.transformServerGameToClient = transformServerGameToClient;
function makeWSResponseMessage(type, payLoadObj) {
    const response = {
        type: type,
        payLoad: payLoadObj
    };
    return JSON.stringify(response);
}
exports.makeWSResponseMessage = makeWSResponseMessage;
//# sourceMappingURL=queryFunctions.js.map