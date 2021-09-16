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
      //TODO изменение стейта
  }
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

function makeNewRoom(/* userWss:WebSocket, connectInfo:string */) {

}

const LobbyService = {
  connectToRoom,
  sendChatMessage,
  makeNewRoom
}
export default LobbyService;

function makeWSRequestString(type: string, payLoadObj:any) {
  const payLoadStr = JSON.stringify(payLoadObj);
  const request: WSRequest = {
    type: type,
    payLoad: payLoadStr
  }

  return payLoadStr;
}