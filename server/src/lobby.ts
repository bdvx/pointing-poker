import { Room } from "./models/socketModels/roomModel";
import { ClientModel } from "./models/socketModels/clientModel"
import { hashCode } from "./hashFunction";
import { UserInfoFromDB } from "./models/httpModels/useFromDBModel";
import { WSResponse } from "./models/socketModels/WSresponseModel";

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

  const eventInfo:WSResponse = {
    type: "JOIN_ROOM",
    payLOad: JSON.stringify(userInfo)
  }

  room.players.forEach((player)=>player.ws.send(JSON.stringify(eventInfo)));
  room.players.push(newPlayer);
}

function disconnectUserFromRoom(room:Room, userLogin:string) {
  room.players.filter((player)=>player.userInfo.login !== userLogin);

  const eventInfo:WSResponse = {
    type:"DISCONNECT_USER",
    payLOad: userLogin
  }
  room.players.forEach((player) => {
    player.ws.send(JSON.stringify(eventInfo));
  })
}

function sendPlayerRoomConfiguration(room:Room, userWs:WebSocket) {
  const eventInfo:WSResponse = {
    type: "UPDATE_ROOM",
    payLOad: JSON.stringify(room)
  }
  userWs.send(JSON.stringify(eventInfo));
/*   room.players.forEach((player)=>{
    player.ws.send(JSON.stringify(eventInfo));
  }) */
}

function makeConnectionEndPoint() {
  
}

const Lobby = {
  makeNewRoom,
  connectUserToRoom,
  disconnectUserFromRoom
}
export default  Lobby;