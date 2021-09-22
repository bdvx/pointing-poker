"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_1 = require("./src/socket");
const http_1 = require("./src/http");
http_1.app.post('/regNewUser', http_1.regNewUser);
http_1.app.post('/singIn', http_1.signIn);
/* app.get('/joinLobby', joinLobbyByUrl); */
http_1.app.post('/joinLobby', http_1.joinLobbyByUrl);
socket_1.wsServer.on('connection', (clientWs) => {
    clientWs.isAlive = true;
    clientWs.on('message', (message) => {
        messageHandler(message, clientWs);
    });
    clientWs.on('pong', () => {
        clientWs.isAlive = true;
    });
    clientWs.on("error", (e) => socket_1.wsServer.send(e));
});
function messageHandler(message, clientWs) {
    const type = JSON.parse(message).type;
    const payLoad = JSON.parse(message).payLoad;
    switch (type) {
        case 'MAKE_NEW_LOBBY':
            socket_1.onMakeNewLobby(clientWs, payLoad);
            break;
        case 'CONNECT_TO_ROOM':
            socket_1.onConnectUserToWebSocket(clientWs, payLoad);
            break;
        case 'DISCONNECT':
            socket_1.onDisconnectUser(clientWs, payLoad);
    }
}
//# sourceMappingURL=index.js.map