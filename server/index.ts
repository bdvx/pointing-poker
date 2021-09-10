import { wsServer, addUser } from "./src/socket";
import { app, regNewUser, signIn } from "./src/http";
import { QueryModel } from "./src/models/queryModel";


app.get('/regNewUser', regNewUser);
app.get('/singIn', signIn);


wsServer.on('connection', (clientWs:any) => {
  clientWs.isAlive = true;
  
  clientWs.on('message', (m:string) =>{ 
    messageHandler(m, clientWs);
  })

  clientWs.on('pong', () => {
    clientWs.isAlive = true;
  });
 
  clientWs.on("error", (e:any) => wsServer.send(e));
});


function messageHandler(m:string, clientWs:WebSocket) {
  let event = (JSON.parse(m) as QueryModel).event;
  let info = (JSON.parse(m) as QueryModel).info;

  switch(event) {
    case 'connection':
      addUser(clientWs);
      break;
  }
}