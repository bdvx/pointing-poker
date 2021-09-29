import { ChatMessageInfo } from "../models/socketModels/chatMessageInfoModel";
import { IssueModel } from "../models/socketModels/issueModel";
import { Room } from "../models/socketModels/roomModel";
import { SettingsModel } from "../models/socketModels/settingsModel";
import { VotingModel } from "../models/socketModels/votingModel";
import { closeConnection } from "../socket";
import DataService from "../tools/dataService";
import { deletePersonFromRoom, makeWSResponseMessage, updateGameForEveryOne, updateLobbyForEveryOne } from "../tools/roomFunctions";
import Game, { makeIssueInfo } from "./game";

function onChatMessage(room:Room, messageInfo: ChatMessageInfo) {
  const response = makeWSResponseMessage("CHAT_MESSAGE", messageInfo);
  room.chat.push(messageInfo);

  room.playersWS.forEach((playerWS) => {
      playerWS.ws.send(response);
  })
}

function onNewIssue(room:Room, issue:IssueModel) {
  room.issues.push(issue);

  if(room.game) {
    room.game.issuesInfo.push(makeIssueInfo(issue));
    updateGameForEveryOne(room);
  }


  updateLobbyForEveryOne(room);
}

function onUpdateIssue(room:Room, newIssue:IssueModel) {
  const index = room.issues.findIndex((issue) => issue.id === newIssue.id);
  room.issues[index] = newIssue;

  if(room.game) {
    const indexGame = room.game.issuesInfo.findIndex((issueInfo) => issueInfo.issue.id === newIssue.id);
    room.game.issuesInfo[indexGame] = makeIssueInfo(newIssue);
    updateGameForEveryOne(room);
  } 
  updateLobbyForEveryOne(room);
}

function onDeleteIssue(room:Room, deletedIssueId: string) {
  const index = room.issues.findIndex((issue) => issue.id === deletedIssueId);
  room.issues.splice(index, 1);

  if(room.game) {
    const indexGame = room.game.issuesInfo.findIndex((issueInfo) => issueInfo.issue.id === deletedIssueId);
    room.game.issuesInfo.splice(indexGame, 1);
    updateGameForEveryOne(room);
  }

  updateLobbyForEveryOne(room);
}

//чуть позже перепешу эту ф-ю
function onOfferKickPlayer(room:Room, voteInfo:VotingModel) {

  const deletePlayerFromRoom = (playerLogin: string) => {
    const deletedPlayerIndex = room.playersWS.findIndex(playerWs => playerWs.userInfo.login === playerLogin);

    const response = makeWSResponseMessage("YOU_ARE_KICKED", "you were kicked by the master");
    room.playersWS[deletedPlayerIndex].ws.send(response);
    
    closeConnection(room.playersWS[deletedPlayerIndex].ws);
    deletePersonFromRoom(room, voteInfo.whoKick);
    //TODO техническое сообщение в чат
    /*     const kickedPlayer:KickedPlayer = {
      kickedLogin: kickInfo.whoKick,
      reason: `user ${kickInfo.whoKick} was kicked by scrum master`
    } */

    updateLobbyForEveryOne(room);
  }

  if(voteInfo.whoOffer === room.scrumInfo.login) { //если удаляет масте
    deletePlayerFromRoom(voteInfo.whoKick);
    updateLobbyForEveryOne(room);
  } else { //голосование
    room.votes.push(voteInfo);
    room.playersWS.forEach((playerWS) => {
      const response = makeWSResponseMessage("KICK_OFFER", voteInfo);

      if(playerWS.userInfo.login !== voteInfo.whoKick &&
         playerWS.userInfo.login !== voteInfo.whoOffer) {
           playerWS.ws.send(response);
      }
    });

    const stopVoiting = (whoKick: string) => {
      const currentVoit = room.votes.find((vote) => vote.whoKick !== whoKick);

      if(currentVoit?.amountAgree && currentVoit?.amountAgree > room.playersWS.length/2 +1) {
        deletePlayerFromRoom(currentVoit.whoKick);
      }
    }

    setTimeout(() => {
      stopVoiting(voteInfo.whoKick);
    }, 60000);
  }
}

function onAgreeWithKick(room:Room, kickedPlayerLogin:string) {
  const index = room.votes.findIndex((vote) => vote.whoKick === kickedPlayerLogin);
  room.votes[index].amountAgree++;
}

function onMakeNewGame(room:Room) {
  Game.makeNewGame(room);
}

function onMoveFromQueue(room:Room, userLogin:string) {
  const index = room.queue.findIndex((observer) => observer.userInfo.login === userLogin);
  room.inGame.push(room.queue[index]);

  room.queue.splice(index, 1);
  updateLobbyForEveryOne(room);
}

function onStopGame(room:Room, reason:string) {
  room.isPlaying = false;
  const roomCopy = JSON.parse(JSON.stringify(room)) as Room;

  DataService.saveRoom(roomCopy);

  delete room.game;
  room.issues = [];

  const response = makeWSResponseMessage("STOP_GAME", reason);
  room.playersWS.forEach((player) => {
    player.ws.send(response);
  })
  updateLobbyForEveryOne(room);
}

function onSetSettings(room:Room, settings:SettingsModel) {
  room.settings = settings;

  const response = makeWSResponseMessage("SET_SETTINGS", settings);
  room.playersWS.forEach((player) => {
    player.ws.send(response);
  })
}

const LobbyEventHandler = {
  onChatMessage,
  onNewIssue,
  onUpdateIssue,
  onDeleteIssue,
  onOfferKickPlayer,
  onAgreeWithKick,
  onMakeNewGame,
  onMoveFromQueue,
  onStopGame,
  onSetSettings
}
export default LobbyEventHandler;

