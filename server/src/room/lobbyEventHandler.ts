import { ChatMessageInfo } from "../models/socketModels/chatMessageInfoModel";
import { IssueModel } from "../models/socketModels/issueModel";
import { KickVoteModel } from "../models/socketModels/kickVoteInfo";
import { Room } from "../models/socketModels/roomModel";
import { SettingsModel } from "../models/socketModels/settingsModel";
import { VotingModel } from "../models/socketModels/votingModel";
import { closeConnection } from "../socket";
import DataService from "../tools/dataService";
import { deletePersonFromRoom, makeWSResponseMessage, sendTechnicalMessage, updateGameForEveryOne, updateKickVotesForEveryOne, updateLobbyForEveryOne } from "../tools/roomFunctions";
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
  voteInfo.amountAgree = 1;
  
  const deletePlayerFromRoom = (playerLogin: string, message:string) => {
    const deletedPlayerIndex = room.playersWS.findIndex(playerWs => playerWs.userInfo.login === playerLogin);

    const response = makeWSResponseMessage("YOU_ARE_KICKED", message);
    room.playersWS[deletedPlayerIndex].ws.send(response);
    
    closeConnection(room.playersWS[deletedPlayerIndex].ws);
    deletePersonFromRoom(room, voteInfo.whoKick);

    sendTechnicalMessage(room, `user ${playerLogin} kiked`);

    updateLobbyForEveryOne(room);
  }

  if(voteInfo.whoOffer === room.scrumInfo.login) { //если удаляет масте
    deletePlayerFromRoom(voteInfo.whoKick, "you are kicked by the master");
    updateLobbyForEveryOne(room);
  } else { //голосование
    voteInfo.votes = room.inGame.map((player) => { return {login:player.userInfo.login, conclusion:null} });
    room.votes.push(voteInfo);
    updateKickVotesForEveryOne(room, room.votes);

    const stopVoiting = (whoKick: string) => {
      const currentVoit = room.votes.find((vote) => vote.whoKick === whoKick);

      if(currentVoit?.amountAgree && currentVoit?.amountAgree >= Math.floor(currentVoit.votes.length/2) +1) {
        deletePlayerFromRoom(currentVoit.whoKick, "you are kicked from room");
        updateLobbyForEveryOne(room);
      }

      const curretnVoteIndex = room.votes.findIndex((vote) => vote.whoKick === whoKick);
      room.votes.splice(curretnVoteIndex, 1);
      updateKickVotesForEveryOne(room, room.votes);
    }

    setTimeout(() => {
      stopVoiting(voteInfo.whoKick);
    }, 15000);
  }
}

function onAgreeWithKick(room:Room, voteInfo:KickVoteModel) {
  const index = room.votes.findIndex((vote) => vote.whoKick === voteInfo.kickedPlayerLogin);
  room.votes[index].amountAgree++;

  const userVote = room.votes[index].votes.find((vote) => vote.login === voteInfo.login)
  if(userVote) {
    userVote.conclusion = voteInfo.conclusion;
  }
  updateKickVotesForEveryOne(room, room.votes);
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
//! решить где удалять игру
/*   delete room.game;
  room.issues = []; */

  const response = makeWSResponseMessage("STOP_GAME", reason);
  room.playersWS.forEach((player) => {
    player.ws.send(response);
  })
  
  updateLobbyForEveryOne(room);

  sendTechnicalMessage(room, "master stoped the game");
}

function onSetSettings(room:Room, settings:SettingsModel) {
  room.settings = settings;
  console.log('set',room.settings)

  if(settings.masterAsPlayer) {
    addScrumAsPlayer(room);
  } else {
    deleteScrumAsPlayer(room);
  }

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

function addScrumAsPlayer(room:Room) {
  const scrumLogin = room.scrumInfo.login;
  const scrumWsInfo = room.playersWS.find((playerWs) => playerWs.userInfo.login === scrumLogin);
  if(scrumWsInfo) {
    room.game?.players.push(scrumWsInfo);
  }
}

function deleteScrumAsPlayer(room:Room) {
  const scrumLogin = room.scrumInfo.login;
  const index = room.game?.players.findIndex((player) => player.userInfo.login === scrumLogin);
  if(index && index !== -1) {
    room.game?.players.splice(index, 1);
  }
}
