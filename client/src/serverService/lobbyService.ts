import { newMessage } from "../store/chatSlice";
import { setRoomInfo } from "../store/roomSlice";
import { deleteVoit, updateVoits } from "../store/voitingSlice";
import { ChatMessageInfo } from "./models/chatMessageInfoModel";
import { ConnectUserToWS } from "./models/connectUserToWSModel";
import { DisconectModel } from "./models/disconnectModel";
import { IssueModel } from "./models/issueModel";
import { Room } from "./models/roomModel";
import { UserInfo } from "./models/userInfoModel";
import { VoitingModel } from "./models/voitingModel";
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
    lobbyDispatch(setRoomInfo(updadedRoom));
  }
  
  const onSuccessRoomBuild = (roomInfo: Room) => {
    lobbyDispatch(setRoomInfo(roomInfo));
  }

  const onChatMessage = (message:ChatMessageInfo) => {
    lobbyDispatch(newMessage(message));
  }

  const onKickOffer = (voitInfo:VoitingModel) => {
    lobbyDispatch(updateVoits(voitInfo)); //можно сделать ход голосования
    setTimeout(() => {
      lobbyDispatch(deleteVoit(voitInfo.whoKick))
    },59000)
    //TODO попап кика
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

function sendKickOfferToRoom(kickInfo: VoitingModel) {
  const request = makeWSRequestString("KICK_PLAYER_OFFER", kickInfo);
  wss.send(request);
}

function sendKickConclusionToRoom(conclusion:boolean, kickedPlayerLogin?:string) {
  if(conclusion) {
    const request = makeWSRequestString("AGREE_WITH_KICK", kickedPlayerLogin);
    wss.send(request);
  }
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
  sendKickConclusionToRoom
}
export default LobbyService;


function makeWSRequestString(type: string, payLoadObj:any) {;
  const request: WSRequest = {
    type: type,
    payLoad: payLoadObj
  }

  return JSON.stringify(request);
}