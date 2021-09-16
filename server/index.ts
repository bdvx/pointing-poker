import { wsServer, connectUserToWebSocket, makeNewLobby, disconnectUSer } from "./src/socket";
import { app, regNewUser, signIn } from "./src/http";
import { QueryModel } from "./src/models/socketModels/WSqueryModel";


app.post('/regNewUser', regNewUser);
app.post('/singIn', signIn);
//app.get('/joinLobby/:id', joinLobbyByUrl);


wsServer.on('connection', (clientWs:any) => {
  clientWs.isAlive = true;

  clientWs.on('message', (message:string) => { 
    messageHandler(message, clientWs);
  })

  clientWs.on('pong', () => {
    clientWs.isAlive = true;
  });
 
  clientWs.on("error", (e:any) => wsServer.send(e));
});


function messageHandler(message:string, clientWs:WebSocket) {
  const type = (JSON.parse(message) as QueryModel).type;
  const payLoad = (JSON.parse(message) as QueryModel).payLoad;

  switch(type) {
    case 'MAKE_NEW_LOBBY':
      makeNewLobby(clientWs, payLoad);
      break;
    case 'CONNECT_TO_ROOM':
      connectUserToWebSocket(clientWs, payLoad);
      break;
    case 'DISCONNECT':
      disconnectUSer(clientWs, payLoad);
  }
}