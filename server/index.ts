import { wsServer, connectUserToWebSocket, makeNewLobby } from "./src/socket";
import { app, regNewUser, signIn } from "./src/http";
import { QueryModel } from "./src/models/queryModel";


app.get('/regNewUser', regNewUser);
app.get('/singIn', signIn);


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
  let type = (JSON.parse(message) as QueryModel).type;
  let payLoad = (JSON.parse(message) as QueryModel).payLoad;

  switch(type) {
    case 'CONNECT_TO_WS':
      connectUserToWebSocket(clientWs, payLoad);
      break;
    case 'MAKE_NEW_LOBBY':
      makeNewLobby(clientWs, payLoad);
      break;
  }
}