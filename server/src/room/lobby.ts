import { Room } from "../models/socketModels/roomModel";
import { WSClientModel } from "../models/socketModels/clientModel"
import { hashCode } from "../tools/hashFunction";
import { WSResponse } from "../models/socketModels/WSresponseModel";
import { QueryModel } from "../models/socketModels/WSqueryModel";
import { ChatMessageInfo } from "../models/socketModels/chatMessageInfoModel";
import { KickInfo } from "../models/socketModels/kickInfoModel";
import { UserInfoModel } from "../models/socketModels/userInfoModel";

function makeNewRoom(scramInfo:WSClientModel) {
  const roomId = String(hashCode(scramInfo.userInfo.login + Date.now()))
  const newRoom:Room = {
    players: [scramInfo],
    roomId: roomId,
    roomUrl: `http://localhost:5000/joinLobby/${roomId}`
  }

  const scramWS = scramInfo.ws as WebSocket;

  scramWS.onmessage = (ev) => { lobbyMessageHandler(newRoom, ev.data) };
  scramWS.send(makeWSResponseMessage("ROOM_BUILD", newRoom));
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
  room.players.forEach((player)=>player.ws.send(JSON.stringify(response)));
  room.players.push(newPlayer);

  newPlayer.ws.send(makeWSResponseMessage("UPDATE_ROOM", room));
}

function disconnectUserFromRoom(room:Room, userLogin:string) {
  room.players.filter((player)=>player.userInfo.login !== userLogin);

  const response = makeWSResponseMessage("DISCONNECT_USER", userLogin);
  room.players.forEach((player) => {
    player.ws.send(JSON.stringify(response));
  })
}

function sendPlayerRoomConfiguration(room:Room, userWs:WebSocket) {
  const response = makeWSResponseMessage("UPDATE_ROOM", room);
  userWs.send(response);

/*   room.players.forEach((player)=>{
    player.ws.send(JSON.stringify(eventInfo));
  }) */
}

function makeConnectionEndPoint() {

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

function onChatMessageHandler(room:Room, payLoad: string) {
  const messageInfo = JSON.parse(payLoad) as ChatMessageInfo;
  const response = makeWSResponseMessage("NEW_MESSAGE", messageInfo);

  room.players.forEach((player)=>{
    if(messageInfo.login !== player.userInfo.login) 
      player.ws.send(response);
  })
}

//TODO где хранить подсчет голосов (room?)
function onOfferKickPlayer(room:Room, payLoad:string) {
  const kickInfo = JSON.parse(payLoad) as KickInfo;
  const response = makeWSResponseMessage("KICK_OFFER", kickInfo);

  room.players.forEach((player)=>{
    if(player.userInfo.login !== kickInfo.whoKick &&
       player.userInfo.login !== kickInfo.whoOffer) {
        player.ws.send(response);
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

const Lobby = {
  makeNewRoom,
  connectUserToRoom,
  disconnectUserFromRoom,
}
export default  Lobby;