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
import { ChatMessageInfo } from "./models/chatMessageInfoModel";
import { ChoiceModel } from "./models/choiceModel";
import Lobby from "../components/pages/Lobby/LobbyStart/Lobby";
import { SettingsModel } from "../store/settingsSlice";

const url = "http://localhost:5000/";
const wsUrl = "ws://localhost:5000/";
let wss:WebSocket;
let isConnect = false;
let serverDispatch:any;
let serverRouter:any;

function setDispatch(dispatch:any) {
  serverDispatch = dispatch;
  LobbyService.setLobbyDispatch(dispatch);
}

function setRouter(router:any) {
  serverRouter = router;
  LobbyService.setLobbyRouter(router);
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

function setKickConclusion(conclusion:boolean, userLogin:string, kickedPlayerLogin?:string,) {
  LobbyService.sendKickConclusionToRoom(conclusion, userLogin, kickedPlayerLogin);
}

function startGame() {
  LobbyService.makeGameInRoom();
}

function sendChatMessage(messageInfo:ChatMessageInfo) {
  LobbyService.sendChatMessage(messageInfo);
}

function movePlayerFromQueueToGame(userLogin:string) {
  LobbyService.movePlayerInRoom(userLogin);
}

function startVoteIssue(issueId:string) {
  LobbyService.startVoteIssueInRoom(issueId);
}

function selectIssue(issueId:string) {
  LobbyService.selectIssueInRoom(issueId);
}

function stopVoteIssue(issueId:string) {
  LobbyService.stopVoteIssueInRoom(issueId);
}

function resetVoteIssue(issueId:string) {
  LobbyService.resetVoteIssueInRoom(issueId);
}

function makeChoice(choiceInfo:ChoiceModel) {
  LobbyService.sendChoiceToGame(choiceInfo);
}

function stopGame() {
  LobbyService.stopGameInRoom();
}

function setSettings(settings:SettingsModel) {
  LobbyService.setSettingsInRoom(settings);
}

const ServerService = {
  setDispatch,
  setRouter,

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
  stopGame,

  sendChatMessage,

  movePlayerFromQueueToGame,

  makeChoice,
  startVoteIssue,
  stopVoteIssue,
  selectIssue,
  resetVoteIssue,

  setSettings
}
export default ServerService;