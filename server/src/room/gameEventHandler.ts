import { ChoiceModel } from "../models/socketModels/choiceModel";
import { IssueInfo } from "../models/socketModels/gameModel";
import { Room } from "../models/socketModels/roomModel";
import { sendUpdatedGame } from "../tools/roomunctions";

function onUserMakeNewChoice(room:Room, userChoiceInfo:ChoiceModel) {
  const { issueId, login, score } = userChoiceInfo;
  const issueInfo = findIssueById(room, issueId);

  if(issueInfo && issueInfo.isVoting) {
    const index = issueInfo.votes.findIndex((vote) => vote.login === userChoiceInfo.login);

    if(!index) {
      issueInfo.votes.push({ login, score });
    } else {
      issueInfo.votes[index] = { login, score };
    }
    updateGameForEveryOne(room);

  }
}

function onStartIssueVote(room:Room, issueId:string) {
  const issueInfo = findIssueById(room, issueId);
  if(issueInfo) {
    issueInfo.isVoting = true;

    updateGameForEveryOne(room);

    //!Сюда прикрутить сетТаймАймаут для остановки голосование (нужны настройки)
  }
}

function onStopIssueVote(room:Room, issueId:string) {
  const issueInfo = findIssueById(room, issueId);

  if(issueInfo) {
    issueInfo.isVoting = false;
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


const GameEventHandler = {
  onUserMakeNewChoice,
  onStartIssueVote,
  onStopIssueVote,
  onSelectIssue
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

function updateGameForEveryOne(room:Room) {
  room.playersWS.forEach((player) => {
    sendUpdatedGame(room, player.ws);
  });
}