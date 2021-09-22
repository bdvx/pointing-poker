import { Room } from "../models/socketModels/roomModel";
import { WSClientModel } from "../models/socketModels/clientModel"
import { hashCode } from "../tools/hashFunction";
import { WSResponse } from "../models/socketModels/WSresponseModel";
import { QueryModel } from "../models/socketModels/WSqueryModel";
import { ChatMessageInfo } from "../models/socketModels/chatMessageInfoModel";
import { UserInfoModel } from "../models/socketModels/userInfoModel";
import { RoomToClient } from "../models/socketModels/roomToClient";
import { DisconectModel } from "../../../client/src/serverService/models/disconnectModel";
import { IssueModel } from "../models/socketModels/issueModel";
import { KickedPlayer } from "../models/socketModels/kickedPlayerMOdel";
import { VotingModel } from "../models/socketModels/votingModel";
import Game from "./game";
import { GameModel } from "../../../client/src/serverService/models/gameModel";

function makeNewRoom(scrumInfo:WSClientModel) {
  const roomId = String(hashCode(scrumInfo.userInfo.login + Date.now()))
  const newRoom:Room = {
    roomId: roomId,
    roomUrl: `http://localhost:5000/joinLobby/${roomId}`,
    chat: [],
    isPlaying: false,
    scrumInfo: scrumInfo.userInfo,
    playersWS: [scrumInfo],
    issues: [],
    votes: [],
    inGame: [],
    queue: []
  }

  const scramWS = scrumInfo.ws as WebSocket;

  scramWS.onmessage = (ev) => { lobbyMessageHandler(newRoom, ev.data) };
  const roomToClient = transformServerRoomToClient(newRoom);
  scramWS.send(makeWSResponseMessage("ROOM_BUILD", roomToClient));
  return newRoom;
}

function connectUserToRoom(room:Room, userInfo:UserInfoModel, userWS:WebSocket) {
  const newPlayer:WSClientModel = {
    ws: userWS,
    userInfo: userInfo
  }
  userWS.onmessage = (ev) => { lobbyMessageHandler(room, ev.data) };

  room.playersWS.push(newPlayer);
  room.queue.push(newPlayer);
  room.playersWS.forEach((player) => {
    sendUpdatedRoom(room, player.ws);
  });
}

function disconnectUserFromRoom(room:Room, disconnectInfo:DisconectModel) {
  const index = room.playersWS.findIndex(player => player.userInfo.login === disconnectInfo.login);
  if (index !== -1) {
    room.playersWS.splice(index, 1);
  }
  //!Какого фига в этом месте не работает filter?
/*   room.playersWS.filter((playerWS) => playerWS.userInfo.login !== disconnectInfo.login); */

  room.playersWS.forEach((playerWS) => {
    sendUpdatedRoom(room, playerWS.ws);
  })
}


function lobbyMessageHandler(room:Room, message:string) {
  const type = (JSON.parse(message) as QueryModel).type;
  const payLoad = (JSON.parse(message) as QueryModel).payLoad;
  //!Для обработки запросов связанных чисто с игрой
  switch(type) {
    case "CHAT_MESSAGE":
      onChatMessage(room, payLoad);
      break;
    case "NEW_ISSUE":
      onNewIssue(room, payLoad);
      break;
    case "UPDATE_ISSUE":
      onUpdateIssue(room, payLoad);
      break;
    case "DELETE_ISSUE":
      onDeleteIssue(room, payLoad);
      break;
    case "KICK_PLAYER_OFFER":
      onOfferKickPlayer(room, payLoad);
      break;
    case "AGREE_WITH_KICK":
      onAgreeWithKick(room, payLoad);
      break;
    case "MAKE_NEW_GAME":
      onMakeNewGame(room, payLoad);
      break;
    case "MOVE_FROM_QUEUE":
      onMoveFromQueue(room, payLoad);
      break;
  }
}

function onChatMessage(room:Room, messageInfo: ChatMessageInfo) {
  const response = makeWSResponseMessage("CHAT_MESSAGE", messageInfo);
  room.playersWS.forEach((playerWS) => {
      playerWS.ws.send(response);
  })
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

    room.playersWS.forEach((player) => {
      sendUpdatedRoom(room, player.ws);
    })
  }

  if(voteInfo.whoOffer === room.scrumInfo.login) { //если удаляет масте
    deletePlayerFromRoom(voteInfo.whoKick);
    room.playersWS.forEach((player) => {
      sendUpdatedRoom(room, player.ws);
    })
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

function onNewIssue(room:Room, issue:IssueModel) {
  room.issues.push(issue);
  room.playersWS.forEach((player) => {
    sendUpdatedRoom(room, player.ws);
  })
}

function onUpdateIssue(room:Room, newIssue:IssueModel) {
  const index = room.issues.findIndex((issue) => issue.id === newIssue.id);
  room.issues[index] = newIssue;

  room.playersWS.forEach((player) => {
    sendUpdatedRoom(room, player.ws);
  })
}

function onDeleteIssue(room:Room, newIssueId: string) {
  const index = room.issues.findIndex((issue) => issue.id === newIssueId);
  room.issues.splice(index, 1);

  room.playersWS.forEach((player) => {
    sendUpdatedRoom(room, player.ws);
  });
}

function onAgreeWithKick(room:Room, kickedPlayerLogin:string) {
  const index = room.votes.findIndex((vote) => vote.whoKick === kickedPlayerLogin);
  room.votes[index].amountAgree++;
}

function onMakeNewGame(room:Room, gameInfo:GameModel) {
  Game.makeNewGame(gameInfo);
}

function onMoveFromQueue(room:Room, userLogin:string) {
  const index = room.queue.findIndex((observer) => observer.userInfo.login === userLogin);
  room.inGame.push(room.queue[index]);

  room.queue.splice(index, 1);
  room.playersWS.forEach((player) => {
    sendUpdatedRoom(room, player.ws);
  });
}

const Lobby = {
  makeNewRoom,
  connectUserToRoom,
  disconnectUserFromRoom,
}
export default  Lobby;


function sendUpdatedRoom(room:Room, ws:WebSocket) {
  const roomToClient = transformServerRoomToClient(room);
  const response = makeWSResponseMessage("UPDATE_ROOM", roomToClient);
  ws.send(response);
}

function transformServerRoomToClient(serverRoom:Room) {
  const clientRoom:RoomToClient = {
    isPlaying: serverRoom.isPlaying,
    players: serverRoom.playersWS.map((playerWs) => playerWs.userInfo),
    roomId: serverRoom.roomId,
    roomUrl: serverRoom.roomUrl,
    scrumInfo: serverRoom.scrumInfo,
    issues: serverRoom.issues,
    inGame: serverRoom.inGame.map((player) => player.userInfo),
    queue: serverRoom.queue.map((player) => player.userInfo)
  }
  return clientRoom;
}

function makeWSResponseMessage(type: string, payLoadObj:any) {
  const response: WSResponse = {
    type: type,
    payLoad: payLoadObj
  }

  return JSON.stringify(response);
}
