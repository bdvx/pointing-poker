import { Room } from "../models/socketModels/roomModel";
import { WSClientModel } from "../models/socketModels/clientModel"
import { hashCode } from "../tools/hashFunction";
import { WSResponse } from "../models/socketModels/WSresponseModel";
import { QueryModel } from "../models/socketModels/WSqueryModel";
import { ChatMessageInfo } from "../models/socketModels/chatMessageInfoModel";
import { KickInfo } from "../models/socketModels/kickInfoModel";
import { UserInfoModel } from "../models/socketModels/userInfoModel";
import { RoomToClient } from "../models/socketModels/roomToClient";

function makeNewRoom(scrumInfo:WSClientModel) {
  const roomId = String(hashCode(scrumInfo.userInfo.login + Date.now()))
  const newRoom:Room = {
    roomId: roomId,
    roomUrl: `http://localhost:5000/joinLobby/${roomId}`,
    chat: [],
    isPlaying: false,
    scrumInfo: scrumInfo.userInfo,
    playersWS: [scrumInfo]
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

  //TODO вынести все ф-и которые отправляют всем пользователям в отдельную ф-ю
  const response = makeWSResponseMessage("NEW_USER_JOIN_ROOM", userInfo);
  room.playersWS.push(newPlayer);
  room.playersWS.forEach((player)=>{
    player.ws.send(response);
  });

  const roomToClient = transformServerRoomToClient(room);
  newPlayer.ws.send(makeWSResponseMessage("UPDATE_ROOM", roomToClient));
}

function disconnectUserFromRoom(room:Room, userLogin:string) {
  room.playersWS.filter((playerWS)=>playerWS.userInfo.login !== userLogin);

  const response = makeWSResponseMessage("DISCONNECT_USER", userLogin);
  room.playersWS.forEach((playerWS) => {
    playerWS.ws.send(JSON.stringify(response));
  })
}

function sendPlayerRoomConfiguration(room:Room, userWs:WebSocket) {
  const roomToClient = transformServerRoomToClient(room);
  const response = makeWSResponseMessage("UPDATE_ROOM", roomToClient);
  userWs.send(response);

/*   room.players.forEach((player)=>{
    player.ws.send(JSON.stringify(eventInfo));
  }) */
}

function lobbyMessageHandler(room:Room, message:string) {
  const type = (JSON.parse(message) as QueryModel).type;
  const payLoad = (JSON.parse(message) as QueryModel).payLoad;
  //!Для обработки запросов связанных чисто с игрой
  switch(type) {
    case "CHAT_MESSAGE":
      onChatMessageHandler(room, payLoad);
      break;
    case "KICK_PLAYER_OFFER":
      onOfferKickPlayer(room, payLoad);
      break;
  }
}

function onChatMessageHandler(room:Room, messageInfo: ChatMessageInfo) {
  const response = makeWSResponseMessage("NEW_MESSAGE", messageInfo);

  room.playersWS.forEach((playerWS)=>{
    if(messageInfo.login !== playerWS.userInfo.login) 
      playerWS.ws.send(response);
  })
}

//TODO где хранить подсчет голосов (room?)
function onOfferKickPlayer(room:Room, kickInfo:KickInfo) {
  const response = makeWSResponseMessage("KICK_OFFER", kickInfo);

  room.playersWS.forEach((playerWS)=>{
    if(playerWS.userInfo.login !== kickInfo.whoKick &&
       playerWS.userInfo.login !== kickInfo.whoOffer) {
         playerWS.ws.send(response);
    }
  })
}

function makeWSResponseMessage(type: string, payLoadObj:any) {
  const response: WSResponse = {
    type: type,
    payLoad: payLoadObj
  }

  return JSON.stringify(response);
}

function transformServerRoomToClient(serverRoom:Room) {
  const clientRoom:RoomToClient = {
    chat: serverRoom.chat,
    isPlaying: serverRoom.isPlaying,
    players: serverRoom.playersWS.map((playerWs)=>playerWs.userInfo),
    roomId: serverRoom.roomId,
    roomUrl: serverRoom.roomUrl,
    scrumInfo: serverRoom.scrumInfo,
  }
  return clientRoom;
}

const Lobby = {
  makeNewRoom,
  connectUserToRoom,
  disconnectUserFromRoom,
}
export default  Lobby;