import LobbyService from "./lobbyService";
import { ConnectUserToWS } from "./models/connectUserToWSModel";
import { HttpResponseModel } from "./models/httpResponseModel";
import { RegistrationModel } from "./models/registrationModel";
import { SignInModel } from "./models/signInModel";
import { WSResponse } from "./models/WSResponseModel";

const url = "http://localhost:5000/";
let wss:WebSocket;
let isConnect = false;
/* let userLogin:string; */

async function registerNewUser(regInfo:RegistrationModel) {
  const request = JSON.stringify(regInfo);

  const response = await fetch(url + "regNewUser", {
    body: request,
    headers: { 'Content-Type': 'application/json' },
    method: "POST"
  }).then(res => res.json());

  return response.message as HttpResponseModel;
}

async function signInUser(signInInfo:SignInModel) {
  const request = JSON.stringify(signInInfo);

  const response = await fetch(url + "singIn", {
    body: request,
    headers: { 'Content-Type': 'application/json' },
    method: "POST"
  }).then(res => res.json());

  return response.message as HttpResponseModel;
}

async function connectToRoom(connectInfo:ConnectUserToWS) {
  const request = JSON.stringify(connectInfo);
  wss = new WebSocket(url);

  wss.onopen = () => {
    isConnect = true;
    LobbyService.connectToRoom(wss, request);

    wss.onmessage = (event) => {
      responseHandler(event.data);
    };
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
  wss.close();
  isConnect = false;
}

const ServerService = {
  registerNewUser,
  signInUser,
  connectToRoom
}
export default ServerService;