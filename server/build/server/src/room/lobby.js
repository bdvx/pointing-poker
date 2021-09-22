"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hashFunction_1 = require("../tools/hashFunction");
const queryFunctions_1 = require("../tools/queryFunctions");
const lobbyEventHandler_1 = require("./lobbyEventHandler");
const gameEventHandler_1 = require("./gameEventHandler");
function makeNewRoom(scrumInfo) {
    const roomId = String(hashFunction_1.hashCode(scrumInfo.userInfo.login + Date.now()));
    const newRoom = {
        roomId: roomId,
        roomUrl: `http://localhost:5000/joinLobby/${roomId}`,
        chat: [],
        isPlaying: false,
        scrumInfo: scrumInfo.userInfo,
        playersWS: [scrumInfo],
        issues: [],
        votes: [],
        inGame: [],
        queue: []
    };
    const scramWS = scrumInfo.ws;
    scramWS.onmessage = (ev) => { lobbyMessageHandler(newRoom, ev.data); };
    const roomToClient = queryFunctions_1.transformServerRoomToClient(newRoom);
    scramWS.send(queryFunctions_1.makeWSResponseMessage("ROOM_BUILD", roomToClient));
    return newRoom;
}
function connectUserToRoom(room, userInfo, userWS) {
    const newPlayer = {
        ws: userWS,
        userInfo: userInfo
    };
    userWS.onmessage = (ev) => { lobbyMessageHandler(room, ev.data); };
    room.playersWS.push(newPlayer);
    room.queue.push(newPlayer);
    room.playersWS.forEach((player) => {
        queryFunctions_1.sendUpdatedRoom(room, player.ws);
    });
}
function disconnectUserFromRoom(room, disconnectInfo) {
    const index = room.playersWS.findIndex(player => player.userInfo.login === disconnectInfo.login);
    if (index !== -1) {
        room.playersWS.splice(index, 1);
    }
    //!Какого фига в этом месте не работает filter?
    /*   room.playersWS.filter((playerWS) => playerWS.userInfo.login !== disconnectInfo.login); */
    room.playersWS.forEach((playerWS) => {
        queryFunctions_1.sendUpdatedRoom(room, playerWS.ws);
    });
}
function lobbyMessageHandler(room, message) {
    const type = JSON.parse(message).type;
    const payLoad = JSON.parse(message).payLoad;
    //!Для обработки запросов связанных чисто с игрой
    switch (type) {
        case "CHAT_MESSAGE":
            lobbyEventHandler_1.default.onChatMessage(room, payLoad);
            break;
        case "NEW_ISSUE":
            lobbyEventHandler_1.default.onNewIssue(room, payLoad);
            break;
        case "UPDATE_ISSUE":
            lobbyEventHandler_1.default.onUpdateIssue(room, payLoad);
            break;
        case "DELETE_ISSUE":
            lobbyEventHandler_1.default.onDeleteIssue(room, payLoad);
            break;
        case "KICK_PLAYER_OFFER":
            lobbyEventHandler_1.default.onOfferKickPlayer(room, payLoad);
            break;
        case "AGREE_WITH_KICK":
            lobbyEventHandler_1.default.onAgreeWithKick(room, payLoad);
            break;
        case "MAKE_NEW_GAME":
            lobbyEventHandler_1.default.onMakeNewGame(room);
            break;
        case "MOVE_FROM_QUEUE":
            lobbyEventHandler_1.default.onMoveFromQueue(room, payLoad);
            break;
        case "USER_MAKE_CHOICE":
            gameEventHandler_1.default.onUserMakeNewChoice(room, payLoad);
            break;
        case "START_ISSUE_VOTE":
            gameEventHandler_1.default.onStartIssueVote(room, payLoad);
            break;
        case "STOP_ISSUE_VOTE":
            gameEventHandler_1.default.onStopIssueVote(room, payLoad);
            break;
        case "SELECT_ISSUE":
            gameEventHandler_1.default.onSelectIssue(room, payLoad);
            break;
    }
}
const Lobby = {
    makeNewRoom,
    connectUserToRoom,
    disconnectUserFromRoom,
};
exports.default = Lobby;
//# sourceMappingURL=lobby.js.map