import { useDispatch } from "react-redux";
import { addNewUserToRoom, setRoomInfo } from "../store/roomSlice";
import { ChatMessageInfo } from "./models/chatMessageInfoModel";
import { Room } from "./models/roomModel";
import { UserInfo } from "./models/userInfoModel";
import { WSRequest } from "./models/WSRequestModel";
import { WSResponse } from "./models/WSResponseModel";

let wss:WebSocket;
let lobbyDispatch:any;

function setLobbyDispatch(dispatch:any) {
  lobbyDispatch = dispatch;
}

function RoomMessageHandler(message:string) {
  const type = (JSON.parse(message) as WSResponse).type;
  const payLoad = (JSON.parse(message) as WSResponse).payLoad;

  const onUpdateRoomStore = (updadedRoomStr: Room) => {
    lobbyDispatch(setRoomInfo(updadedRoomStr));
  }
  
  const onNewUserJoinRoom = (newUserInfo: UserInfo) => {
    lobbyDispatch(addNewUserToRoom(newUserInfo));
  }
  
  const onSuccessRoomBuild = (roomInfo: Room) => {
    lobbyDispatch(setRoomInfo(roomInfo));
  }

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





function sendChatMessage(messageInfo:ChatMessageInfo) {
  const request = makeWSRequestString("CHAT_MESSAGE", messageInfo);
  wss.send(request);
}

function makeNewRoom(userWss:WebSocket, scramInfo:string) {
  wss = userWss;
  const request = makeWSRequestString("MAKE_NEW_LOBBY", scramInfo);
  wss.send(request);
  wss.onmessage = (ev) => { RoomMessageHandler(ev.data) };
}

function connectToRoom(userWss:WebSocket, connectInfo:string) {
  wss = userWss;
  wss.send(makeWSRequestString("CONNECT_TO_ROOM", connectInfo));

  wss.onmessage = (ev) => { RoomMessageHandler(ev.data) };
}

const LobbyService = {
  connectToRoom,
  sendChatMessage,
  makeNewRoom,
  setLobbyDispatch
}
export default LobbyService;

function makeWSRequestString(type: string, payLoadObj:any) {;
  const request: WSRequest = {
    type: type,
    payLoad: payLoadObj
  }

  return JSON.stringify(request);
}