import { Room } from "../models/socketModels/roomModel";
import { WSClientModel } from "../models/socketModels/clientModel"
import { hashCode } from "../tools/hashFunction";
import { QueryModel } from "../models/socketModels/WSqueryModel";
import { UserInfoModel } from "../models/socketModels/userInfoModel";
import { DisconectModel } from "../../../client/src/serverService/models/disconnectModel";
import { makeWSResponseMessage, sendUpdatedRoom, transformServerRoomToClient } from "../tools/queryFunctions";
import LobbyEventHandler from "./lobbyEventHandler";
import GameEventHandler from "./gameEventHandler";

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
      LobbyEventHandler.onChatMessage(room, payLoad);
      break;
    case "NEW_ISSUE":
      LobbyEventHandler.onNewIssue(room, payLoad);
      break;
    case "UPDATE_ISSUE":
      LobbyEventHandler.onUpdateIssue(room, payLoad);
      break;
    case "DELETE_ISSUE":
      LobbyEventHandler.onDeleteIssue(room, payLoad);
      break;
    case "KICK_PLAYER_OFFER":
      LobbyEventHandler.onOfferKickPlayer(room, payLoad);
      break;
    case "AGREE_WITH_KICK":
      LobbyEventHandler.onAgreeWithKick(room, payLoad);
      break;
    case "MAKE_NEW_GAME":
      LobbyEventHandler.onMakeNewGame(room);
      break;
    case "MOVE_FROM_QUEUE":
      LobbyEventHandler.onMoveFromQueue(room, payLoad);
      break;
    
    case "USER_MAKE_CHOICE":
      GameEventHandler.onUserMakeNewChoice(room, payLoad);
      break;
    case "START_ISSUE_VOTE":
      GameEventHandler.onStartIssueVote(room, payLoad);
      break;
    case "STOP_ISSUE_VOTE":
      GameEventHandler.onStopIssueVote(room, payLoad);
      break;
    case "SELECT_ISSUE":
      GameEventHandler.onSelectIssue(room, payLoad);
      break;
  }
}

const Lobby = {
  makeNewRoom,
  connectUserToRoom,
  disconnectUserFromRoom,
}
export default  Lobby;
