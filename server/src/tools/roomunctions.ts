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

export function deletePersonFromRoom(room:Room, login:string) {
  const gameIndex = room.inGame.findIndex(playerWs => playerWs.userInfo.login === login);
  if (gameIndex !== -1) {
    room.inGame.splice(gameIndex, 1);
  }

  const queueIndex = room.queue.findIndex(playerWs => playerWs.userInfo.login === login);
  if (queueIndex !== -1) {
    room.queue.splice(queueIndex, 1);
  }

  const roomIndex = room.playersWS.findIndex(playerWs => playerWs.userInfo.login === login);
  if (roomIndex !== -1) {
    room.playersWS.splice(roomIndex, 1);
  }
  return roomIndex;
}

export function updateLobbyForEveryOne(room:Room) {
  room.playersWS.forEach((player) => {
    sendUpdatedRoom(room, player.ws);
  });
}

export function updateGameForEveryOne(room:Room) {
  room.playersWS.forEach((player) => {
    sendUpdatedGame(room, player.ws);
  });
}