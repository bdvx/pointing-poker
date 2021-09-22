"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queryFunctions_1 = require("../tools/queryFunctions");
function makeNewGame(room) {
    const gameInfo = {
        issuesInfo: room.issues.map((issue) => makeIssueInfo(issue)),
        isVoting: false,
        players: room.playersWS
    };
    room.game = gameInfo;
    room.isPlaying = true;
    room.playersWS.forEach((player) => {
        const gameToClient = queryFunctions_1.transformServerRoomToClient(room);
        const response = queryFunctions_1.makeWSResponseMessage("START_GAME", gameToClient);
        player.ws.send(response);
    });
}
function makeIssueInfo(issue) {
    const issueInfo = {
        isVoting: false,
        issue: issue,
        votes: [],
        isSelected: false
    };
    return issueInfo;
}
const Game = {
    makeNewGame
};
exports.default = Game;
/* room.playersWS.forEach((player) => {
  sendUpdatedGame(room, player.ws);
}) */ 
//# sourceMappingURL=game.js.map