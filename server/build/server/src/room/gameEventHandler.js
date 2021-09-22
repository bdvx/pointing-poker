"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queryFunctions_1 = require("../tools/queryFunctions");
function onUserMakeNewChoice(room, userChoiceInfo) {
    const { issueId, login, score } = userChoiceInfo;
    const issueInfo = findIssueById(room, issueId);
    if (issueInfo && issueInfo.isVoting) {
        const index = issueInfo.votes.findIndex((vote) => vote.login === userChoiceInfo.login);
        if (!index) {
            issueInfo.votes.push({ login, score });
        }
        else {
            issueInfo.votes[index] = { login, score };
        }
        updateGameForEveryOne(room);
    }
}
function onStartIssueVote(room, issueId) {
    const issueInfo = findIssueById(room, issueId);
    if (issueInfo) {
        issueInfo.isVoting = true;
        updateGameForEveryOne(room);
        //!Сюда прикрутить сетТаймАймаут для остановки голосование (нужны настройки)
    }
}
function onStopIssueVote(room, issueId) {
    const issueInfo = findIssueById(room, issueId);
    if (issueInfo) {
        issueInfo.isVoting = false;
        issueInfo.result = makeVoteResult(issueInfo);
        updateGameForEveryOne(room);
    }
}
function onSelectIssue(room, issueId) {
    var _a;
    const issueInfo = findIssueById(room, issueId);
    if (issueInfo) {
        (_a = room.game) === null || _a === void 0 ? void 0 : _a.issuesInfo.forEach((issueInfo) => {
            issueInfo.isSelected = false;
        }); //сброс селекта
        issueInfo.isSelected = true;
        updateGameForEveryOne(room);
    }
}
const GameEventHandler = {
    onUserMakeNewChoice,
    onStartIssueVote,
    onStopIssueVote,
    onSelectIssue
};
exports.default = GameEventHandler;
function makeVoteResult(issueInfo) {
    //TODO нормальный подсчет результата + варик когда пользователь не проголосовал/не знает что ставить
    let result = 0;
    issueInfo.votes.forEach((vote) => {
        result += vote.score;
    });
    return result;
}
function findIssueById(room, issueId) {
    var _a;
    const issueInfo = (_a = room.game) === null || _a === void 0 ? void 0 : _a.issuesInfo.find((issueInfo) => issueInfo.issue.id === issueId);
    if (issueInfo) {
        return issueInfo;
    }
    else {
        console.log("Обсуждение не найдено");
    }
}
function updateGameForEveryOne(room) {
    room.playersWS.forEach((player) => {
        queryFunctions_1.sendUpdatedGame(room, player.ws);
    });
}
//# sourceMappingURL=gameEventHandler.js.map