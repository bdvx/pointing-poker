import { ChatMessageInfo } from "../models/socketModels/chatMessageInfoModel";
import { IssueModel } from "../models/socketModels/issueModel";
import { Room } from "../models/socketModels/roomModel";
import { VotingModel } from "../models/socketModels/votingModel";
import { makeWSResponseMessage, sendUpdatedRoom } from "../tools/queryFunctions";
import Game from "./game";

function onChatMessage(room:Room, messageInfo: ChatMessageInfo) {
  const response = makeWSResponseMessage("CHAT_MESSAGE", messageInfo);
  room.playersWS.forEach((playerWS) => {
      playerWS.ws.send(response);
  })
}

function onNewIssue(room:Room, issue:IssueModel) {
  room.issues.push(issue);
  updateLobbyForEveryOne(room);
}

function onUpdateIssue(room:Room, newIssue:IssueModel) {
  const index = room.issues.findIndex((issue) => issue.id === newIssue.id);
  room.issues[index] = newIssue;

  updateLobbyForEveryOne(room);
}

function onDeleteIssue(room:Room, newIssueId: string) {
  const index = room.issues.findIndex((issue) => issue.id === newIssueId);
  room.issues.splice(index, 1);

  updateLobbyForEveryOne(room);
}

//чуть позже перепешу эту ф-ю
function onOfferKickPlayer(room:Room, voteInfo:VotingModel) {

  const deletePlayerFromRoom = (playerLogin: string) => {
    room.playersWS.filter((playerWs) => playerWs.userInfo.login !== playerLogin);
    room.votes.filter((vote) => vote.whoKick !== playerLogin);
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

const LobbyEventHandler = {
  onChatMessage,
  onNewIssue,
  onUpdateIssue,
  onDeleteIssue,
  onOfferKickPlayer,
  onAgreeWithKick,
  onMakeNewGame,
  onMoveFromQueue
}
export default LobbyEventHandler;


function updateLobbyForEveryOne(room:Room) {
  room.playersWS.forEach((player) => {
    sendUpdatedRoom(room, player.ws);
  });
}
