import { ClientModel } from "./models/clientModel";
import { app } from "./http";

const http = require('http');
const webSocket = require('ws');
const server = http.createServer(app);
const wsServer = new webSocket.Server({server});

let connectUsers:Array<ClientModel>=[];

server.listen(5000, () => console.log("Server started"))

setInterval(() => {
  connectUsers.forEach((client) => {
    if (!client.ws.isAlive) return closeConnection(client.ws,'pong');

    client.ws.isAlive = false;
    client.ws.ping();
  });
}, 10000);


function addUser(ws:WebSocket){
  let client:ClientModel = { ws:ws };
  connectUsers.push(client);
  console.log('add user');
}

function closeConnection(ws:WebSocket,info:string){
  connectUsers = connectUsers.filter((user)=>user.ws !== ws);
  ws.close();
}

export {
  wsServer,
  addUser,
}