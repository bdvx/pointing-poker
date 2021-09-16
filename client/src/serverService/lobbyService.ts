import { ChatMessageInfo } from "./models/chatMessageInfoModel";
import { WSRequest } from "./models/WSRequestModel";
import { WSResponse } from "./models/WSResponseModel";

let wss:WebSocket;

function roomMessageHandler(message:string) {
  const type = (JSON.parse(message) as WSResponse).type;
  const payLoad = (JSON.parse(message) as WSResponse).payLoad;

  switch(type) {
    case "NEW_USER_JOIN_ROOM":
    //case "UPDATE_ROOM":  TODO изменение стейта
    //case "DISCONNECT_USER":
    case "KICK_OFFER":
    case "NEW_MESSAGE":
    case "ROOM_BUILD":
      onSuccessRoomBuild();
      break;
  }
}

function makeNewRoom(userWss:WebSocket, roomInfo:string) {
  wss = userWss;
  const request = makeWSRequestString("MAKE_NEW_LOBBY", roomInfo);

  wss.send(request);
  wss.onmessage = (ev) => { roomMessageHandler(ev.data) };
}

function connectToRoom(userWss:WebSocket, connectInfo:string) {
  wss = userWss;
  wss.send(makeWSRequestString("CONNECT_TO_ROOM", connectInfo));

  wss.onmessage = (ev) => { roomMessageHandler(ev.data) };
}

function sendChatMessage(messageInfo:ChatMessageInfo) {
  const request = makeWSRequestString("CHAT_MESSAGE", messageInfo);
  wss.send(request);
}

function onSuccessRoomBuild() {
  //TODO изменение стейта
}

const LobbyService = {
  connectToRoom,
  sendChatMessage,
  makeNewRoom
}
export default LobbyService;

function makeWSRequestString(type: string, payLoadObj:any) {;
  const request: WSRequest = {
    type: type,
    payLoad: payLoadObj
  }

  return JSON.stringify(request);
}