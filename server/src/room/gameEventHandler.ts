import { ChoiceModel } from "../models/socketModels/choiceModel";
import { IssueInfo } from "../models/socketModels/gameModel";
import { Room } from "../models/socketModels/roomModel";
import { sendUpdatedGame } from "../tools/queryFunctions";

function onUserMakeNewChoice(room:Room, userChoiceInfo:ChoiceModel) {
  const { issueId, login, score } = userChoiceInfo;
  const issueInfo = room.game?.issuesInfo.find((issueInfo) => issueInfo.issue.id === issueId);

  if(issueInfo && issueInfo.isVoting) {
    const index = issueInfo.votes.findIndex((vote) => vote.login === userChoiceInfo.login);

    if(!index) {
      issueInfo.votes.push({ login, score });
    } else {
      issueInfo.votes[index] = { login, score };
    }
    room.playersWS.forEach((player) => {
      sendUpdatedGame(room, player.ws);
    });

  } else {
    console.log("Обсуждение не найдено");
  }
}

function onStartIssueVote(room:Room, issueId:string) {
  const issueInfo = room.game?.issuesInfo.find((issueInfo) => issueInfo.issue.id === issueId);

  if(issueInfo) {
    issueInfo.isVoting = true;

    room.playersWS.forEach((player) => {
      sendUpdatedGame(room, player.ws);
    });

    //!Сюда прикрутить сетТаймАймаут для остановки голосование (нужны настройки)
  } else {
    console.log("Обсуждение не найдено");
  }
}

function onStopIssueVote(room:Room, issueId:string) {
  const issueInfo = room.game?.issuesInfo.find((issueInfo) => issueInfo.issue.id === issueId);

  if(issueInfo) {
    issueInfo.isVoting = false;
    issueInfo.result = makeVoteResult(issueInfo);

    room.playersWS.forEach((player) => {
      sendUpdatedGame(room, player.ws);
    });
  } else {
    console.log("Обсуждение не найдено");
  }
}

function onSelectIssue(room:Room, issueId:string) {
  const issueInfo = room.game?.issuesInfo.find((issueInfo) => issueInfo.issue.id === issueId);

  if(issueInfo) {
    room.game?.issuesInfo.forEach((issueInfo) => {
      issueInfo.isSelected = false;
    }); //сброс селекта
    issueInfo.isSelected = true;

    room.playersWS.forEach((player) => {
      sendUpdatedGame(room, player.ws);
    });
  } else {
    console.log("Обсуждение не найдено");
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