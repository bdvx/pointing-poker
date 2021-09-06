import { ClientModel } from "./models/clientModel";
import { app } from "./http";
import DataService from "./dataService";
import { SignInModel } from "./models/signInModel";
import { ResponseModel } from "./models/responseModel";
import { ConnectUserToWS } from "./models/connectUsetToWSModel";
import { WSResponse } from "./models/WSresponseModel";
import { Room } from "./models/roomModel";

const http = require('http');
const webSocket = require('ws');
const server = http.createServer(app);
const wsServer = new webSocket.Server({server});
const port = process.env.PORT || 3000;

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


async function connectUserToWebSocket(ws:WebSocket, payLoad:string) {
  const userInfo = JSON.parse(payLoad) as ConnectUserToWS;
  const userInfoFromDB = await DataService.getUserByLogin(userInfo.login);

  if(userInfoFromDB) {
    let client:ClientModel = { ws:ws, userInfo:userInfoFromDB };
    connectUsers.push(client);
  } else {
    const response:WSResponse = { type:"CONNECTION_FAILURE", payLOad:"you should register before playing" }; 
    ws.send(JSON.stringify(response));
    closeConnection(ws);
  }
}

function closeConnection(ws:WebSocket){
  connectUsers = connectUsers.filter((user)=>user.ws !== ws);
  ws.close();
}

async function makeNewLobby(masterWs:WebSocket, payLoad:string) {
  //TODO создание комнаты + айди на основании мастера
}

export {
  wsServer,
  connectUserToWebSocket,
  makeNewLobby
}