import { ClientGameModel } from "../models/socketModels/clientGameModel";
import { GameModel } from "../models/socketModels/gameModel";
import { Room } from "../models/socketModels/roomModel";
import { RoomToClient } from "../models/socketModels/roomToClient";
import { WSResponse } from "../models/socketModels/WSresponseModel";

export function sendUpdatedRoom(room:Room, ws:WebSocket) {
  const roomToClient = transformServerRoomToClient(room);
  const response = makeWSResponseMessage("UPDATE_ROOM", roomToClient);
  ws.send(response);
}

export function sendUpdatedGame(room:Room, ws:WebSocket) {
  if(room.game) {
    const gameToClient = transformServerGameToClient(room.game);
    const response = makeWSResponseMessage("UPDATE_GAME", gameToClient);
    ws.send(response);
  }
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

export function transformServerGameToClient(serverGame:GameModel) {
  const { isVoting, issuesInfo, players } = serverGame;
  const clientGame: ClientGameModel = {
    isVoting, issuesInfo,
    players: players.map((player) => player.userInfo),
  }
  return clientGame;
}

export function makeWSResponseMessage(type: string, payLoadObj:any) {
  const response: WSResponse = {
    type: type,
    payLoad: payLoadObj
  }

  return JSON.stringify(response);
}