import { newMessage } from "../store/chatSlice";
import { setCurrentUserScrumStatus } from "../store/currentUserSlice";
import { resetGame, setGame } from "../store/gameSlice";
import { resetRoomInfo, setRoomInfo } from "../store/roomSlice";
import { setSettings, SettingsModel } from "../store/settingsSlice";
import { deleteVoit, updateVoits } from "../store/votingSlice";
import { ChatMessageInfo } from "./models/chatMessageInfoModel";
import { ChoiceModel } from "./models/choiceModel";
import { ConnectUserToWS } from "./models/connectUserToWSModel";
import { DisconectModel } from "./models/disconnectModel";
import { GameModel } from "./models/gameModel";
import { IssueModel } from "./models/issueModel";
import { Room } from "./models/roomModel";
import { UserInfo } from "./models/userInfoModel";
import { VotingModel } from "./models/votingModel";
import { WSRequest } from "./models/WSRequestModel";
import { WSResponse } from "./models/WSResponseModel";

let wss:WebSocket;
let lobbyDispatch:any;
let lobbyRouter:any;

function setLobbyDispatch(dispatch:any) {
  lobbyDispatch = dispatch;
}

function setLobbyRouter(router:any) {
  lobbyRouter = router;
}

function RoomMessageHandler(message:string) {
  const type = (JSON.parse(message) as WSResponse).type;
  const payLoad = (JSON.parse(message) as WSResponse).payLoad;

  const onUpdateRoomStore = (updadedRoom: Room) => {
    lobbyDispatch(setRoomInfo(updadedRoom));
  }
  
  const onSuccessRoomBuild = (roomInfo: Room) => {
    lobbyDispatch(setRoomInfo(roomInfo));
    lobbyDispatch(setCurrentUserScrumStatus());
  }

  const onChatMessage = (message:ChatMessageInfo) => {
    lobbyDispatch(newMessage(message));
  }

  const onKickOffer = (voteInfo:VotingModel) => {
    lobbyDispatch(updateVoits(voteInfo)); //можно сделать ход голосования
    setTimeout(() => {
      lobbyDispatch(deleteVoit(voteInfo.whoKick))
    }, 59000)
    //TODO попап кика
  }

  const onGameStart = (gameInfo:GameModel) => {
    lobbyDispatch(setGame(gameInfo));
    lobbyRouter.push("/game");
  }

  const onGameUpdate = (gameInfo:GameModel) => {
    lobbyDispatch(setGame(gameInfo));
  }

  const onYouAreKicked = (message:string) => {
    lobbyRouter.push("/welcomePage");
    lobbyDispatch(resetRoomInfo());
    alert(message);
  }

  const onStopGame = (reason:string) => {
    lobbyRouter.push("/lobbyStart");
    lobbyDispatch(resetGame());
    alert(reason);
  }

  const onStartIssueVote = (gameInfo:GameModel) => {
    lobbyDispatch(setGame(gameInfo));
    alert("Голосование");
  }

  const onSetSettings = (settings:SettingsModel) => {
    lobbyDispatch(setSettings(settings));
  }

  switch(type) {
    case "UPDATE_ROOM": 
      onUpdateRoomStore(payLoad);
      break;

    case "ROOM_BUILD":
      onSuccessRoomBuild(payLoad);
      break;
      
    case "CHAT_MESSAGE":
      onChatMessage(payLoad);
      break;

    case "KICK_OFFER":
      onKickOffer(payLoad);
      break;

    case "START_GAME":
      onGameStart(payLoad);
      break;
    
    case "STOP_GAME":
      onStopGame(payLoad);
      break;

    case "UPDATE_GAME":
      onGameUpdate(payLoad);
      break;
    
    case "YOU_ARE_KICKED":
      onYouAreKicked(payLoad);
      break;
    
    case "START_ISSUE_VOTE":
      onStartIssueVote(payLoad);
      break;
    
    case "SET_SETTINGS":
      onSetSettings(payLoad);
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

function sendIssueToRoom(issue:IssueModel) {
  console.log(issue);
  const request = makeWSRequestString("NEW_ISSUE", issue);
  wss.send(request);
}

function updateIssueInRoom(issue:IssueModel) {
  const request = makeWSRequestString("UPDATE_ISSUE", issue);
  wss.send(request);
}

function deleteIssue(issueId:string) {
  const request = makeWSRequestString("DELETE_ISSUE", issueId);
  wss.send(request);
}

function sendKickOfferToRoom(kickInfo: VotingModel) {
  const request = makeWSRequestString("KICK_PLAYER_OFFER", kickInfo);
  wss.send(request);
}

function sendKickConclusionToRoom(conclusion:boolean, kickedPlayerLogin?:string) {
  if(conclusion) {
    const request = makeWSRequestString("AGREE_WITH_KICK", kickedPlayerLogin);
    wss.send(request);
  }
}

function makeGameInRoom() {
  const request = makeWSRequestString("MAKE_NEW_GAME", 'make new game');
  wss.send(request);
}

function movePlayerInRoom(userLogin:string) {
  const request = makeWSRequestString("MOVE_FROM_QUEUE", userLogin);
  wss.send(request);
}

function sendChoiceToGame(choiceInfo:ChoiceModel) {
  const request = makeWSRequestString("USER_MAKE_CHOICE", choiceInfo);
  wss.send(request);
}

function selectIssueInRoom(issueId:string) {
  const request = makeWSRequestString("SELECT_ISSUE", issueId);
  wss.send(request);
}

function startVoteIssueInRoom(issueId:string) {
  const request = makeWSRequestString("START_ISSUE_VOTE", issueId);
  wss.send(request);
}

function stopVoteIssueInRoom(issueId:string) {
  const request = makeWSRequestString("STOP_ISSUE_VOTE", issueId);
  wss.send(request);
}

function resetVoteIssueInRoom(issueId:string) {
  const request = makeWSRequestString("RESET_ISSUE_VOTE", issueId);
  wss.send(request);
}

function stopGameInRoom() {
  const request = makeWSRequestString("STOP_GAME", "master stopped the game");
  wss.send(request);
}

function setSettingsInRoom(settings:SettingsModel) {
  const request = makeWSRequestString("SET_SETTINGS", settings);
  wss.send(request);
}

const LobbyService = {
  connectToRoom,
  sendChatMessage,
  makeNewRoom,
  setLobbyDispatch,
  disconectFromRoom,
  sendIssueToRoom,
  updateIssueInRoom,
  deleteIssue,
  sendKickOfferToRoom,
  sendKickConclusionToRoom,
  makeGameInRoom,
  movePlayerInRoom,
  setLobbyRouter,
  sendChoiceToGame,
  startVoteIssueInRoom,
  stopVoteIssueInRoom,
  selectIssueInRoom,
  stopGameInRoom,
  resetVoteIssueInRoom,
  setSettingsInRoom
}
export default LobbyService;


function makeWSRequestString(type: string, payLoadObj:any) {;
  const request: WSRequest = {
    type: type,
    payLoad: payLoadObj
  }

  return JSON.stringify(request);
}