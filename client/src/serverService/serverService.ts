import { UserInfo } from "./models/userInfoModel";
import LobbyService from "./lobbyService";
import { ConnectUserToWS } from "./models/connectUserToWSModel";
import { HttpResponseModel } from "./models/httpResponseModel";
import { RegistrationModel } from "./models/registrationModel";
import { SignInModel } from "./models/signInModel";
import { WSResponse } from "./models/WSResponseModel";

const url = "http://localhost:5000/";
const wsUrl = "ws://localhost:5000/";
let wss:WebSocket;
let isConnect = false;

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
  const request = JSON.stringify(connectionInfo);
  wss = new WebSocket(wsUrl);

  wss.onopen = () => {
    isConnect = true;
    LobbyService.connectToRoom(wss, request);

    wss.onmessage = (event) => {
      responseHandler(event.data);
    };
  }
}

function makeNewRoom(scramtInfo:UserInfo) {
  const request = JSON.stringify(scramtInfo);
  wss = new WebSocket(wsUrl);

  wss.onopen = () => {
    isConnect = true;
    wss.onmessage = (event) => {
      responseHandler(event.data);
    };
    LobbyService.makeNewRoom(wss, request);
  }
}

function responseHandler(message:string){
  let event = (JSON.parse(message) as WSResponse).type;
  let info = (JSON.parse(message) as WSResponse).payLoad;

  switch(event){
    case "CONNECTION_FAILURE": //!этот кейс скорей всего и не нужен
      onConnectionFailure(info);
      break;
  }
}

//TODO мб норм расширение нужно?
function onConnectionFailure(info:string) {
  alert(info)
  wss.close();
  isConnect = false;
}

const ServerService = {
  registerNewUser,
  signInUser,
  connectToRoom,
  makeNewRoom
}
export default ServerService;