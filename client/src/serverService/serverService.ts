import { ConnectUserToWS } from "./models/connectUserToWSModel";
import { RegistrationModel } from "./models/registrationModel";
import { SignInModel } from "./models/signInModel";
import { WSRequest } from "./models/WSRequestModel";
import { WSResponse } from "./models/WSResponseModel";

const url = "http://localhost:5000/";
let wss:WebSocket;
let isConnect = false;
/* let userLogin:string; */

async function registerNewUser(regInfo:RegistrationModel) {
  const request = JSON.stringify(regInfo);

  const response = await fetch(url + "regNewUser", {
    body: request,
    method: "POST"
  });

  return response.body;
}

async function signInUser(signInInfo:SignInModel) {
  const request = JSON.stringify(signInInfo);

  const response = await fetch(url + "singIn", {
    body: request,
    method: "POST"
  });

  return response.body;
}

async function connectToRoom(connectInfo:ConnectUserToWS) {
  const request = JSON.stringify(connectInfo);
  wss = new WebSocket(url);

  wss.onopen = () => {
    isConnect = true;
    wss.send(makeWSRequestString("CONNECT_TO_ROOM", connectInfo));

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

function makeWSRequestString(type: string, payLoadObj:any) {
  const payLoadStr = JSON.stringify(payLoadObj);
  const request: WSRequest = {
    type: type,
    payLoad: payLoadStr
  }

  return payLoadStr;
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