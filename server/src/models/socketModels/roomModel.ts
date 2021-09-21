import { VoitingModel } from "../../../../client/src/serverService/models/voitingModel";
import { ChatMessageInfo } from "./chatMessageInfoModel";
import { WSClientModel } from "./clientModel";
import { GameModel } from "./gameModel";
import { IssueModel } from "./issueModel";
import { UserInfoModel } from "./userInfoModel";

export interface Room {
  roomId: string,
  roomUrl: string,
  queue: Array<WSClientModel>,
  inGame: Array<WSClientModel>,
  playersWS: Array<WSClientModel>,
  chat: Array<ChatMessageInfo>,
  isPlaying: boolean,
  scrumInfo: UserInfoModel,
  issues: Array<IssueModel>,
  game?: GameModel,
  voits: Array<VoitingModel>
}