import { ChatMessageInfo } from "./chatMessageInfoModel";
import { WSClientModel } from "./clientModel";
import { GameModel } from "./gameModel";
import { IssueModel } from "./issueModel";
import { UserInfoModel } from "./userInfoModel";

export interface Room {
  roomId: string,
  roomUrl: string,
  chat: Array<ChatMessageInfo>,
  isPlaying: boolean,
  scrumInfo: UserInfoModel,
  playersWS: Array<WSClientModel>,
  issues: Array<IssueModel>,
  game?: GameModel
}