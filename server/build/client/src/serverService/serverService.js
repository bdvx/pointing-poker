"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lobbyService_1 = require("./lobbyService");
const hashFunction_1 = require("../tool/hashFunction");
const url = "http://localhost:5000/";
const wsUrl = "ws://localhost:5000/";
let wss;
let isConnect = false;
let serverDispatch;
let serverRouter;
function setDispatch(dispatch) {
    serverDispatch = dispatch;
    lobbyService_1.default.setLobbyDispatch(dispatch);
}
function setRouter(router) {
    serverRouter = router;
    lobbyService_1.default.setLobbyRouter(router);
}
//http part
function registerNewUser(regInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const request = JSON.stringify(regInfo);
        const response = yield fetch(url + "regNewUser", {
            body: request,
            headers: { 'Content-Type': 'application/json' },
            method: "POST"
        }).then(res => res.json());
        return response;
    });
}
function signInUser(signInInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const request = JSON.stringify(signInInfo);
        const response = yield fetch(url + "singIn", {
            body: request,
            headers: { 'Content-Type': 'application/json' },
            method: "POST"
        }).then(res => res.json());
        return response;
    });
}
//WS part
function connectToRoom(userInfo, roomId) {
    const connectionInfo = {
        userInfo: userInfo,
        roomId: roomId
    };
    wss = new WebSocket(wsUrl);
    wss.onopen = () => {
        isConnect = true;
        lobbyService_1.default.connectToRoom(wss, connectionInfo);
    };
}
function makeNewRoom(scrumInfo) {
    wss = new WebSocket(wsUrl);
    wss.onopen = () => {
        isConnect = true;
        lobbyService_1.default.makeNewRoom(wss, scrumInfo);
    };
}
function disconect(userInfo, roomId, reason) {
    const disconnectInfo = {
        login: userInfo.login,
        reason: reason || '',
        roomId: roomId
    };
    lobbyService_1.default.disconectFromRoom(disconnectInfo);
}
function makeIssue(issue) {
    //TODO сделать нормальный id
    issue.id = String(hashFunction_1.hashCode(issue.title));
    lobbyService_1.default.sendIssueToRoom(issue);
}
function updateIssue(issue) {
    lobbyService_1.default.updateIssueInRoom(issue);
}
function deleteIssue(issueId) {
    lobbyService_1.default.deleteIssue(issueId);
}
function kickPlayer(kickInfo) {
    lobbyService_1.default.sendKickOfferToRoom(kickInfo);
}
function setKickConclusion(conclusion, kickedPlayerLogin) {
    lobbyService_1.default.sendKickConclusionToRoom(conclusion, kickedPlayerLogin);
}
function startGame() {
    lobbyService_1.default.makeGameInRoom();
}
function sendChatMessage(messageInfo) {
    lobbyService_1.default.sendChatMessage(messageInfo);
}
function movePlayerFromQueueToGame(userLogin) {
    lobbyService_1.default.movePlayerInRoom(userLogin);
}
function startVote(issueId) {
    lobbyService_1.default.startVoteInRoom(issueId);
}
function selectIssue(issueId) {
    lobbyService_1.default.selectIssueInRoom(issueId);
}
function stopVote(issueId) {
    lobbyService_1.default.stopVoteInRoom(issueId);
}
function makeChoice(choiceInfo) {
    lobbyService_1.default.sendChoiceToGame(choiceInfo);
}
const ServerService = {
    setDispatch,
    setRouter,
    registerNewUser,
    signInUser,
    connectToRoom,
    makeNewRoom,
    disconect,
    makeIssue,
    updateIssue,
    deleteIssue,
    kickPlayer,
    setKickConclusion,
    startGame,
    sendChatMessage,
    movePlayerFromQueueToGame,
    makeChoice,
    startVote,
    stopVote,
    selectIssue
};
exports.default = ServerService;
//# sourceMappingURL=serverService.js.map