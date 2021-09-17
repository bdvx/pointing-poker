import { ClientModel } from "./models/socketModels/clientModel";
import { app } from "./http";
import DataService from "./tools/dataService";
import { ConnectUserToWS } from "./models/socketModels/connectUserToWSModel";
import { WSResponse } from "./models/socketModels/WSresponseModel";
import { Room } from "./models/socketModels/roomModel";
import { NewLobbyModel } from "./models/socketModels/newLobbyModel";
import  Lobby  from "./room/lobby";
import { UserInfoFromDB } from "./models/httpModels/useFromDBModel";
import { DisconectModel } from "./models/socketModels/disconectModel";
import { UserInfoModel } from "./models/socketModels/userInfoModel";
//import { Request, Response } from 'express';

const http = require('http');
const webSocket = require('ws');
const server = http.createServer(app);
const wsServer = new webSocket.Server({server});
const port = process.env.PORT || 5000;

let connectUsers:Array<ClientModel> = [];
const rooms:Array<Room> = []

server.listen(port, () => console.log("Server started"))

setInterval(() => {
  connectUsers.forEach((client) => {
    if (!client.ws.isAlive) return closeConnection(client.ws);

    client.ws.isAlive = false;
    client.ws.ping();
  });
}, 10000);

function makeNewLobby(masterWs:WebSocket, payLoad:string) {
  const scramInfo = JSON.parse(payLoad) as UserInfoModel;

  const roomScramInfo: ClientModel = {
    ws:masterWs,
    userInfo: scramInfo
  }

  const newRoom = Lobby.makeNewRoom(roomScramInfo);
  rooms.push(newRoom);
}

function connectUserToWebSocket(ws:WebSocket, payLoad:string) {
  const connectInfo = JSON.parse(payLoad) as ConnectUserToWS;
  const userInfo = connectInfo.userInfo;

  if(userInfo.login) {
    let client:ClientModel = { ws:ws, userInfo:userInfo };
    connectUsers.push(client);
    addUserToRoom(connectInfo.roomId, userInfo, ws);
  } else {
    const response:WSResponse = { type:"CONNECTION_FAILURE", payLOad:"you should register before playing" }; 
    ws.send(JSON.stringify(response));
    closeConnection(ws);
  }
}

function addUserToRoom(roomId: string,userInfo: UserInfoModel, userWs:WebSocket) {
  const room = rooms.find((room)=>room.roomId === roomId);
  if(room) {
    Lobby.connectUserToRoom(room, userInfo, userWs);
  } else {
    console.log("Ошибка подключения к комнате");
  }
}

function closeConnection(ws:WebSocket){
  connectUsers = connectUsers.filter((user)=>user.ws !== ws);
  ws.close();
}

function disconnectUSer(userWs:WebSocket, payLoad:string) {
  const userInfo = JSON.parse(payLoad) as DisconectModel;
  closeConnection(userWs);

  const room = rooms.find((room)=>room.roomId === userInfo.roomId);
  if(room) {
    Lobby.disconnectUserFromRoom(room, userInfo.login);
  } else {
    console.log("ошибка: отключение от несуществующей комнаты");
  }
}

/* function joinLobbyByUrl(req: Request, res:Response) {
  //TODO  джоин в комнату
  //connectUserToWebSocket()
} */

export {
  wsServer,
  connectUserToWebSocket,
  makeNewLobby,
  disconnectUSer,
}