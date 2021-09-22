import { UserInfo } from "./models/userInfoModel";
import LobbyService from "./lobbyService";
import { ConnectUserToWS } from "./models/connectUserToWSModel";
import { HttpResponseModel } from "./models/httpResponseModel";
import { RegistrationModel } from "./models/registrationModel";
import { SignInModel } from "./models/signInModel";
import { DisconectModel } from "./models/disconnectModel";
import { IssueModel } from "./models/issueModel";
import { hashCode } from "../tool/hashFunction";
import { VotingModel } from "./models/votingModel";
import { GameModel } from "./models/gameModel";
import { ChatMessageInfo } from "./models/chatMessageInfoModel";

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

function makeIssue(issue:IssueModel) {
  //TODO сделать нормальный id
  issue.id = String(hashCode(issue.title));
  LobbyService.sendIssueToRoom(issue);
}

function updateIssue(issue:IssueModel) {
  LobbyService.updateIssueInRoom(issue);
}

function deleteIssue(issueId:string) {
  LobbyService.deleteIssue(issueId);
}

function kickPlayer(kickInfo:VotingModel) {
  LobbyService.sendKickOfferToRoom(kickInfo);
}

function setKickConclusion(conclusion:boolean, kickedPlayerLogin?:string) {
  LobbyService.sendKickConclusionToRoom(conclusion, kickedPlayerLogin);
}

function startGame(gameInfo:GameModel) {
  LobbyService.makeGameInRoom(gameInfo);
}

function sendChatMessage(messageInfo:ChatMessageInfo) {
  LobbyService.sendChatMessage(messageInfo);
}

function movePlayerFromQueueToGame(userLogin:string) {
  LobbyService.movePlayerInRoom(userLogin);
}

const ServerService = {
  setDispatch,
  registerNewUser,
  signInUser,
  connectToRoom,
  makeNewRoom,
  disconect,
  
  makeIssue,
  updateIssue,
  deleteIssue,

  kickPlayer,
  setKickConclusion,

  startGame,

  sendChatMessage,

  movePlayerFromQueueToGame
}
export default ServerService;