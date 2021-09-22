"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chatSlice_1 = require("../store/chatSlice");
const gameSlice_1 = require("../store/gameSlice");
const roomSlice_1 = require("../store/roomSlice");
const votingSlice_1 = require("../store/votingSlice");
let wss;
let lobbyDispatch;
let lobbyRouter;
function setLobbyDispatch(dispatch) {
    lobbyDispatch = dispatch;
}
function setLobbyRouter(router) {
    lobbyRouter = router;
}
function RoomMessageHandler(message) {
    const type = JSON.parse(message).type;
    const payLoad = JSON.parse(message).payLoad;
    const onUpdateRoomStore = (updadedRoom) => {
        lobbyDispatch(roomSlice_1.setRoomInfo(updadedRoom));
    };
    const onSuccessRoomBuild = (roomInfo) => {
        lobbyDispatch(roomSlice_1.setRoomInfo(roomInfo));
    };
    const onChatMessage = (message) => {
        lobbyDispatch(chatSlice_1.newMessage(message));
    };
    const onKickOffer = (voteInfo) => {
        lobbyDispatch(votingSlice_1.updateVoits(voteInfo)); //можно сделать ход голосования
        setTimeout(() => {
            lobbyDispatch(votingSlice_1.deleteVoit(voteInfo.whoKick));
        }, 59000);
        //TODO попап кика
    };
    const onGameStart = (gameInfo) => {
        lobbyDispatch(gameSlice_1.setGame(gameInfo));
        lobbyRouter.push("/game");
        //! Добавить этот роут в роутинг
    };
    const onGameUpdate = (gameInfo) => {
        lobbyDispatch(gameSlice_1.setGame(gameInfo));
    };
    switch (type) {
        case "UPDATE_ROOM":
            onUpdateRoomStore(payLoad);
            break;
        case "ROOM_BUILD":
            onSuccessRoomBuild(payLoad);
            break;
        case "CHAT_MESSAGE":
            onChatMessage(payLoad);
            break;
        case "KICK_OFFER":
            onKickOffer(payLoad);
            break;
        case "START_GAME":
            onGameStart(payLoad);
            break;
        case "UPDATE_GAME":
            onGameUpdate(payLoad);
            break;
    }
}
function makeNewRoom(userWss, scrumInfo) {
    wss = userWss;
    const request = makeWSRequestString("MAKE_NEW_LOBBY", scrumInfo);
    wss.send(request);
    wss.onmessage = (ev) => { RoomMessageHandler(ev.data); };
}
function connectToRoom(userWss, connectInfo) {
    wss = userWss;
    wss.send(makeWSRequestString("CONNECT_TO_ROOM", connectInfo));
    wss.onmessage = (ev) => { RoomMessageHandler(ev.data); };
}
function disconectFromRoom(disconnectInfo) {
    const request = makeWSRequestString('DISCONNECT', disconnectInfo);
    wss.send(request);
}
function sendChatMessage(messageInfo) {
    const request = makeWSRequestString("CHAT_MESSAGE", messageInfo);
    wss.send(request);
}
function sendIssueToRoom(issue) {
    const request = makeWSRequestString("NEW_ISSUE", issue);
    wss.send(request);
}
function updateIssueInRoom(issue) {
    const request = makeWSRequestString("UPDATE_ISSUE", issue);
    wss.send(request);
}
function deleteIssue(issueId) {
    const request = makeWSRequestString("DELETE_ISSUE", issueId);
    wss.send(request);
}
function sendKickOfferToRoom(kickInfo) {
    const request = makeWSRequestString("KICK_PLAYER_OFFER", kickInfo);
    wss.send(request);
}
function sendKickConclusionToRoom(conclusion, kickedPlayerLogin) {
    if (conclusion) {
        const request = makeWSRequestString("AGREE_WITH_KICK", kickedPlayerLogin);
        wss.send(request);
    }
}
function makeGameInRoom() {
    const request = makeWSRequestString("MAKE_NEW_GAME", 'make new game');
    wss.send(request);
}
function movePlayerInRoom(userLogin) {
    const request = makeWSRequestString("MOVE_FROM_QUEUE", userLogin);
    wss.send(request);
}
function sendChoiceToGame(choiceInfo) {
    const request = makeWSRequestString("USER_MAKE_CHOICE", choiceInfo);
    wss.send(request);
}
function selectIssueInRoom(issueId) {
    const request = makeWSRequestString("SELECT_ISSUE", issueId);
    wss.send(request);
}
function startVoteInRoom(issueId) {
    const request = makeWSRequestString("START_ISSUE_VOTE", issueId);
    wss.send(request);
}
function stopVoteInRoom(issueId) {
    const request = makeWSRequestString("STOP_ISSUE_VOTE", issueId);
    wss.send(request);
}
const LobbyService = {
    connectToRoom,
    sendChatMessage,
    makeNewRoom,
    setLobbyDispatch,
    disconectFromRoom,
    sendIssueToRoom,
    updateIssueInRoom,
    deleteIssue,
    sendKickOfferToRoom,
    sendKickConclusionToRoom,
    makeGameInRoom,
    movePlayerInRoom,
    setLobbyRouter,
    sendChoiceToGame,
    startVoteInRoom,
    stopVoteInRoom,
    selectIssueInRoom
};
exports.default = LobbyService;
function makeWSRequestString(type, payLoadObj) {
    ;
    const request = {
        type: type,
        payLoad: payLoadObj
    };
    return JSON.stringify(request);
}
//# sourceMappingURL=lobbyService.js.map