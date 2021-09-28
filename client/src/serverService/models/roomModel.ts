import { ChatMessageInfo } from "./chatMessageInfoModel";
import { UserInfo } from "./userInfoModel";
import { IssueModel } from "./issueModel";


export interface Room {
  roomId: string,
  roomUrl: string,
  isPlaying: boolean,
  scrumInfo: UserInfo,
  isVoting: boolean,
  players: Array<UserInfo>,
  queue: Array<UserInfo>,
  inGame: Array<UserInfo>,
  amountAgreeWithKick: number,
  issues: Array<IssueModel>
}