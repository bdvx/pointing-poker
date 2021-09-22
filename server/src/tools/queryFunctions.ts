import { Room } from "../models/socketModels/roomModel";
import { RoomToClient } from "../models/socketModels/roomToClient";
import { WSResponse } from "../models/socketModels/WSresponseModel";

export function sendUpdatedRoom(room:Room, ws:WebSocket) {
  const roomToClient = transformServerRoomToClient(room);
  const response = makeWSResponseMessage("UPDATE_ROOM", roomToClient);
  ws.send(response);
}


export function transformServerRoomToClient(serverRoom:Room) {
  const {isPlaying, roomId, roomUrl, scrumInfo, issues} = serverRoom;
  const clientRoom:RoomToClient = {
    isPlaying, roomId, roomUrl, scrumInfo, issues,
    players: serverRoom.playersWS.map((playerWs) => playerWs.userInfo),
    inGame: serverRoom.inGame.map((player) => player.userInfo),
    queue: serverRoom.queue.map((player) => player.userInfo)
  }
  return clientRoom;
}

export function makeWSResponseMessage(type: string, payLoadObj:any) {
  const response: WSResponse = {
    type: type,
    payLoad: payLoadObj
  }

  return JSON.stringify(response);
}