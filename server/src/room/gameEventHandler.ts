import { ChoiceModel } from "../models/socketModels/choiceModel";
import { IssueInfo } from "../models/socketModels/gameModel";
import { Room } from "../models/socketModels/roomModel";
import { makeWSResponseMessage, transformServerGameToClient, updateGameForEveryOne } from "../tools/roomFunctions";

function onUserMakeNewChoice(room:Room, userChoiceInfo:ChoiceModel) {
  const { issueId, login, score } = userChoiceInfo;
  const issueInfo = findIssueById(room, issueId);

  if(issueInfo && issueInfo.isVoting) {
    const index = issueInfo.votes.findIndex((vote) => vote.login === userChoiceInfo.login);

    if(index === -1) {
      issueInfo.votes.push({ login, score });
    } else {
      issueInfo.votes[index] = { login, score };
    }
    updateGameForEveryOne(room);

  }
}

function onStartIssueVote(room:Room, issueId:string) {
  const issueInfo = findIssueById(room, issueId);
  if(issueInfo && room.game) {
    issueInfo.isVoting = true;
    room.game.isVoting = true;

    if(room.game) {
      const gameToClient = transformServerGameToClient(room.game);
      const response = makeWSResponseMessage("START_ISSUE_VOTE", gameToClient);
      room.game?.players.forEach((player)=>{ player.ws.send(response) });      

      setTimeout(() => {
        onStopIssueVote(room, issueId);
      }, room.settings.roundTime);
    }

  }
}

function onStopIssueVote(room:Room, issueId:string) {
  const issueInfo = findIssueById(room, issueId);

  if(issueInfo && room.game && issueInfo.isVoting) { //последняя проверка если голосование закончилось досрочно
    issueInfo.isVoting = false;
    room.game.isVoting = true;

    issueInfo.result = makeVoteResult(issueInfo);
    updateGameForEveryOne(room);
  }
}

function onSelectIssue(room:Room, issueId:string) {
  const issueInfo = findIssueById(room, issueId);

  if(issueInfo) {
    room.game?.issuesInfo.forEach((issueInfo) => {
      issueInfo.isSelected = false;
    }); //сброс селекта
    issueInfo.isSelected = true;

    updateGameForEveryOne(room);
  } 
}

function onResetIssueVote(room:Room, issueId:string) {
  const issueInfo = findIssueById(room, issueId);

  if(issueInfo && !issueInfo.isVoting) {
    issueInfo.votes = [];
    issueInfo.result = 0;
    updateGameForEveryOne(room);
  } 
}


const GameEventHandler = {
  onUserMakeNewChoice,
  onStartIssueVote,
  onStopIssueVote,
  onSelectIssue,
  onResetIssueVote
}

export default GameEventHandler;


function makeVoteResult(issueInfo:IssueInfo) {
  //TODO нормальный подсчет результата + варик когда пользователь не проголосовал/не знает что ставить
  let result = 0;
  issueInfo.votes.forEach((vote) => {
    result += vote.score;
  })
  return result;
}

function findIssueById(room:Room, issueId:string) {
  const issueInfo = room.game?.issuesInfo.find((issueInfo) => issueInfo.issue.id === issueId);

  if(issueInfo) {
    return issueInfo;
  } else {
    console.log("Обсуждение не найдено");
  }
}
