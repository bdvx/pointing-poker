import { addNewUserToRoom, setRoomInfo, addNewMessage } from "../store/roomSlice";
import { ChatMessageInfo } from "./models/chatMessageInfoModel";
import { ConnectUserToWS } from "./models/connectUserToWSModel";
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

  const onUpdateRoomStore = (updadedRoom: Room) => {
    console.log('update', updadedRoom)
    lobbyDispatch(setRoomInfo(updadedRoom));
  }
  
  const onNewUserJoinRoom = (newUserInfo: UserInfo) => {
    console.log('new', newUserInfo)
    lobbyDispatch(addNewUserToRoom(newUserInfo));
  }
  
  const onSuccessRoomBuild = (roomInfo: Room) => {
    lobbyDispatch(setRoomInfo(roomInfo));
  }

  const onNewMessage = (messageInfo:ChatMessageInfo) => {
    lobbyDispatch(addNewMessage(messageInfo));
  }
  console.log(111,message)
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
      onNewMessage(payLoad);
      break;
    case "ROOM_BUILD":
      onSuccessRoomBuild(payLoad);
      break;
  }  
}


function makeNewRoom(userWss:WebSocket, scrumInfo:UserInfo) {
  wss = userWss;
  const request = makeWSRequestString("MAKE_NEW_LOBBY", scrumInfo);
  wss.send(request);
  
  wss.onmessage = (ev) => { RoomMessageHandler(ev.data) };
}

function connectToRoom(userWss:WebSocket, connectInfo:ConnectUserToWS) {
  wss = userWss;
  wss.send(makeWSRequestString("CONNECT_TO_ROOM", connectInfo));

  wss.onmessage = (ev) => { RoomMessageHandler(ev.data); };
}

function sendChatMessage(messageInfo:ChatMessageInfo) {
  const request = makeWSRequestString("CHAT_MESSAGE", messageInfo);
  wss.send(request);
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