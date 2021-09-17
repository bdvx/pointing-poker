import { addNewUserToRoom, setRoomInfo } from "../store/roomSlice";
import { ChatMessageInfo } from "./models/chatMessageInfoModel";
import { Room } from "./models/roomModel";
import { UserInfo } from "./models/userInfoModel";
import { WSRequest } from "./models/WSRequestModel";
import { WSResponse } from "./models/WSResponseModel";

let wss:WebSocket;

function roomMessageHandler(message:string) {
  const type = (JSON.parse(message) as WSResponse).type;
  const payLoad = (JSON.parse(message) as WSResponse).payLoad;

  switch(type) {
    case "NEW_USER_JOIN_ROOM":
      onNewUserJoinRoom(payLoad);
      break;
    case "UPDATE_ROOM": 
      onUpdateRoomStore(payLoad);
      break;
    //case "DISCONNECT_USER":
    case "KICK_OFFER":
    case "NEW_MESSAGE":
    case "ROOM_BUILD":
      onSuccessRoomBuild(payLoad);
      break;
  }
}


const onUpdateRoomStore = (updadedRoomStr: Room) => {
  setRoomInfo(updadedRoomStr);
}

const onNewUserJoinRoom = (newUserInfo: UserInfo) => {
  addNewUserToRoom(newUserInfo);
}

const onSuccessRoomBuild = (roomInfo: Room) => {
  setRoomInfo(roomInfo);
}




function sendChatMessage(messageInfo:ChatMessageInfo) {
  const request = makeWSRequestString("CHAT_MESSAGE", messageInfo);
  wss.send(request);
}

function makeNewRoom(userWss:WebSocket, scramInfo:string) {
  wss = userWss;
  const request = makeWSRequestString("MAKE_NEW_LOBBY", scramInfo);
  wss.send(request);
  wss.onmessage = (ev) => { roomMessageHandler(ev.data) };
}

function connectToRoom(userWss:WebSocket, connectInfo:string) {
  wss = userWss;

  wss.send(makeWSRequestString("CONNECT_TO_ROOM", connectInfo));

  wss.onmessage = (ev) => { roomMessageHandler(ev.data) };
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