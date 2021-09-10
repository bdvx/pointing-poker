import { Room } from "../models/socketModels/roomModel";
import { ClientModel } from "../models/socketModels/clientModel"
import { hashCode } from "../tools/hashFunction";
import { UserInfoFromDB } from "../models/httpModels/useFromDBModel";
import { WSResponse } from "../models/socketModels/WSresponseModel";
import { QueryModel } from "../models/socketModels/WSqueryModel";
import { ChatMessageInfo } from "../models/socketModels/chatMessageInfoModel";
import { KickInfo } from "../models/socketModels/kickInfoModel";

function makeNewRoom(scramInfo:ClientModel) {
  const newRoom:Room = {
    players: [scramInfo],
    roomId: String(hashCode(scramInfo.userInfo.login)),
  }

  return newRoom;
}

function connectUserToRoom(room:Room, userInfo:UserInfoFromDB, userWS:WebSocket) {
  const newPlayer:ClientModel = {
    ws: userWS,
    userInfo: userInfo
  }
  userWS.onmessage = (ev) => { lobbyMessageHandler(room, ev.data) };

  const response = makeWSResponseMessage("JOIN_ROOM", userInfo);
  room.players.forEach((player)=>player.ws.send(JSON.stringify(response)));
  room.players.push(newPlayer);
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
      chatMessageHandler(room, payLoad);
      break;
    case "KICK_PLAYER_OFFER":
      offerKickPlayer(room, payLoad);
      break;
  }
}

function chatMessageHandler(room:Room, payLoad: string) {
  const messageInfo = JSON.parse(payLoad) as ChatMessageInfo;
  const response = makeWSResponseMessage("NEW_MESSAGE", messageInfo);

  room.players.forEach((player)=>{
    if(messageInfo.login !== player.userInfo.login) 
      player.ws.send(response);
  })
}

//TODO где хранить подсчет голосов (room?)
function offerKickPlayer(room:Room, payLoad:string) {
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
  const payLoadStr = JSON.stringify(payLoadObj);
  const response: WSResponse = {
    type: type,
    payLOad: payLoadStr
  }

  return payLoadStr;
}

const Lobby = {
  makeNewRoom,
  connectUserToRoom,
  disconnectUserFromRoom,
}
export default  Lobby;