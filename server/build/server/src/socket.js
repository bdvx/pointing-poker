"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDisconnectUser = exports.onMakeNewLobby = exports.onConnectUserToWebSocket = exports.wsServer = void 0;
const http_1 = require("./http");
const lobby_1 = require("./room/lobby");
const http = require('http');
const webSocket = require('ws');
const server = http.createServer(http_1.app);
const wsServer = new webSocket.Server({ server });
exports.wsServer = wsServer;
const port = process.env.PORT || 5000;
let connectUsers = [];
const rooms = [];
server.listen(port, () => console.log("Server started"));
setInterval(() => {
    connectUsers.forEach((client) => {
        if (!client.ws.isAlive)
            return closeConnection(client.ws);
        client.ws.isAlive = false;
        client.ws.ping();
    });
}, 10000);
function onMakeNewLobby(masterWs, scramInfo) {
    const roomScramInfo = {
        ws: masterWs,
        userInfo: scramInfo
    };
    const newRoom = lobby_1.default.makeNewRoom(roomScramInfo);
    rooms.push(newRoom);
}
exports.onMakeNewLobby = onMakeNewLobby;
function onConnectUserToWebSocket(ws, connectInfo) {
    const userInfo = connectInfo.userInfo;
    if (userInfo.login) {
        let client = { ws: ws, userInfo: userInfo };
        connectUsers.push(client);
        addUserToRoom(connectInfo.roomId, userInfo, ws);
    }
    else {
        const response = { type: "CONNECTION_FAILURE", payLoad: "you should register before playing" };
        ws.send(JSON.stringify(response));
        closeConnection(ws);
    }
}
exports.onConnectUserToWebSocket = onConnectUserToWebSocket;
function addUserToRoom(roomId, userInfo, userWs) {
    const room = rooms.find((room) => room.roomId === roomId);
    if (room) {
        lobby_1.default.connectUserToRoom(room, userInfo, userWs);
    }
    else {
        console.log("Ошибка подключения к комнате");
    }
}
function onDisconnectUser(userWs, disconnectInfo) {
    closeConnection(userWs);
    const room = rooms.find((room) => room.roomId === disconnectInfo.roomId);
    if (room) {
        lobby_1.default.disconnectUserFromRoom(room, disconnectInfo);
    }
    else {
        console.log("ошибка: отключение от несуществующей комнаты");
    }
}
exports.onDisconnectUser = onDisconnectUser;
function closeConnection(ws) {
    connectUsers = connectUsers.filter((user) => user.ws !== ws);
    ws.close();
}
//# sourceMappingURL=socket.js.map