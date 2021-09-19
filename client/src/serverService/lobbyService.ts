import { addNewUserToRoom, setRoomInfo, addNewMessage, deleteUser } from "../store/roomSlice";
import { ChatMessageInfo } from "./models/chatMessageInfoModel";
import { ConnectUserToWS } from "./models/connectUserToWSModel";
import { DisconectModel } from "./models/disconnectModel";
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
    lobbyDispatch(addNewUserToRoom(newUserInfo));
  }
  
  const onSuccessRoomBuild = (roomInfo: Room) => {
    lobbyDispatch(setRoomInfo(roomInfo));
  }

  const onNewMessage = (messageInfo:ChatMessageInfo) => {
    lobbyDispatch(addNewMessage(messageInfo));
  }

  const onDisconnectUser = (disconnectInfo:DisconectModel) => {
    lobbyDispatch(deleteUser(disconnectInfo.login));
    //можно сообщение выводить в чат
  }

  switch(type) {
    case "NEW_USER_JOIN_ROOM":
      onNewUserJoinRoom(payLoad);
      break;
    case "UPDATE_ROOM": 
      onUpdateRoomStore(payLoad);
      break;
    case "DISCONNECT_USER":
      onDisconnectUser(payLoad);
      break;
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

function disconectFromRoom(disconnectInfo:DisconectModel) {
  const request = makeWSRequestString('DISCONNECT', disconnectInfo);
  wss.send(request);
}

function sendChatMessage(messageInfo:ChatMessageInfo) {
  const request = makeWSRequestString("CHAT_MESSAGE", messageInfo);
  wss.send(request);
}

const LobbyService = {
  connectToRoom,
  sendChatMessage,
  makeNewRoom,
  setLobbyDispatch,
  disconectFromRoom
}
export default LobbyService;


function makeWSRequestString(type: string, payLoadObj:any) {;
  const request: WSRequest = {
    type: type,
    payLoad: payLoadObj
  }

  return JSON.stringify(request);
}