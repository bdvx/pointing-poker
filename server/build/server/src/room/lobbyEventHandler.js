"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queryFunctions_1 = require("../tools/queryFunctions");
const game_1 = require("./game");
function onChatMessage(room, messageInfo) {
    const response = queryFunctions_1.makeWSResponseMessage("CHAT_MESSAGE", messageInfo);
    room.playersWS.forEach((playerWS) => {
        playerWS.ws.send(response);
    });
}
function onNewIssue(room, issue) {
    room.issues.push(issue);
    updateLobbyForEveryOne(room);
}
function onUpdateIssue(room, newIssue) {
    const index = room.issues.findIndex((issue) => issue.id === newIssue.id);
    room.issues[index] = newIssue;
    updateLobbyForEveryOne(room);
}
function onDeleteIssue(room, newIssueId) {
    const index = room.issues.findIndex((issue) => issue.id === newIssueId);
    room.issues.splice(index, 1);
    updateLobbyForEveryOne(room);
}
//чуть позже перепешу эту ф-ю
function onOfferKickPlayer(room, voteInfo) {
    const deletePlayerFromRoom = (playerLogin) => {
        room.playersWS.filter((playerWs) => playerWs.userInfo.login !== playerLogin);
        room.votes.filter((vote) => vote.whoKick !== playerLogin);
        //TODO техническое сообщение в чат
        /*     const kickedPlayer:KickedPlayer = {
          kickedLogin: kickInfo.whoKick,
          reason: `user ${kickInfo.whoKick} was kicked by scrum master`
        } */
        updateLobbyForEveryOne(room);
    };
    if (voteInfo.whoOffer === room.scrumInfo.login) { //если удаляет масте
        deletePlayerFromRoom(voteInfo.whoKick);
        updateLobbyForEveryOne(room);
    }
    else { //голосование
        room.votes.push(voteInfo);
        room.playersWS.forEach((playerWS) => {
            const response = queryFunctions_1.makeWSResponseMessage("KICK_OFFER", voteInfo);
            if (playerWS.userInfo.login !== voteInfo.whoKick &&
                playerWS.userInfo.login !== voteInfo.whoOffer) {
                playerWS.ws.send(response);
            }
        });
        const stopVoiting = (whoKick) => {
            const currentVoit = room.votes.find((vote) => vote.whoKick !== whoKick);
            if ((currentVoit === null || currentVoit === void 0 ? void 0 : currentVoit.amountAgree) && (currentVoit === null || currentVoit === void 0 ? void 0 : currentVoit.amountAgree) > room.playersWS.length / 2 + 1) {
                deletePlayerFromRoom(currentVoit.whoKick);
            }
        };
        setTimeout(() => {
            stopVoiting(voteInfo.whoKick);
        }, 60000);
    }
}
function onAgreeWithKick(room, kickedPlayerLogin) {
    const index = room.votes.findIndex((vote) => vote.whoKick === kickedPlayerLogin);
    room.votes[index].amountAgree++;
}
function onMakeNewGame(room) {
    game_1.default.makeNewGame(room);
}
function onMoveFromQueue(room, userLogin) {
    const index = room.queue.findIndex((observer) => observer.userInfo.login === userLogin);
    room.inGame.push(room.queue[index]);
    room.queue.splice(index, 1);
    updateLobbyForEveryOne(room);
}
const LobbyEventHandler = {
    onChatMessage,
    onNewIssue,
    onUpdateIssue,
    onDeleteIssue,
    onOfferKickPlayer,
    onAgreeWithKick,
    onMakeNewGame,
    onMoveFromQueue
};
exports.default = LobbyEventHandler;
function updateLobbyForEveryOne(room) {
    room.playersWS.forEach((player) => {
        queryFunctions_1.sendUpdatedRoom(room, player.ws);
    });
}
//# sourceMappingURL=lobbyEventHandler.js.map