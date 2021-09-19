import { UserInfo } from "./models/userInfoModel";
import LobbyService from "./lobbyService";
import { ConnectUserToWS } from "./models/connectUserToWSModel";
import { HttpResponseModel } from "./models/httpResponseModel";
import { RegistrationModel } from "./models/registrationModel";
import { SignInModel } from "./models/signInModel";
import { DisconectModel } from "./models/disconnectModel";

const url = "http://localhost:5000/";
const wsUrl = "ws://localhost:5000/";
let wss:WebSocket;
let isConnect = false;
let serverDispatch:any;

function setDispatch(dispatch:any) {
  serverDispatch = dispatch;
  LobbyService.setLobbyDispatch(dispatch);
}


//http part
async function registerNewUser(regInfo:RegistrationModel) {
  const request = JSON.stringify(regInfo);

  const response = await fetch(url + "regNewUser", {
    body: request,
    headers: { 'Content-Type': 'application/json' },
    method: "POST"
  }).then(res => res.json());

  return response as HttpResponseModel;
}

async function signInUser(signInInfo:SignInModel) {
  const request = JSON.stringify(signInInfo);

  const response = await fetch(url + "singIn", {
    body: request,
    headers: { 'Content-Type': 'application/json' },
    method: "POST"
  }).then(res => res.json());

  return response as HttpResponseModel;
}

//WS part
function connectToRoom(userInfo: UserInfo, roomId:string) {
  const connectionInfo:ConnectUserToWS = {
    userInfo: userInfo,
    roomId: roomId
  }
  wss = new WebSocket(wsUrl);

  wss.onopen = () => {
    isConnect = true;
    LobbyService.connectToRoom(wss, connectionInfo);
  }
}

function makeNewRoom(scrumInfo:UserInfo) {
  wss = new WebSocket(wsUrl);

  wss.onopen = () => {
    isConnect = true;
    LobbyService.makeNewRoom(wss, scrumInfo);
  }
}

function disconect(userInfo:UserInfo, roomId:string, reason?:string) {
  const disconnectInfo:DisconectModel = {
    login: userInfo.login,
    reason: reason || '',
    roomId: roomId
  }
  LobbyService.disconectFromRoom(disconnectInfo);
}


const ServerService = {
  registerNewUser,
  signInUser,
  connectToRoom,
  makeNewRoom,
  setDispatch,
  disconect
}
export default ServerService;