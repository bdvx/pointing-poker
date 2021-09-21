import { ChatMessageInfo } from "../../../../client/src/serverService/models/chatMessageInfoModel";
import { IssueModel } from "./issueModel";
import { UserInfoModel } from "./userInfoModel";

export interface RoomToClient {
  roomId: string,
  players: Array<UserInfoModel>,
  roomUrl: string,
  isPlaying: boolean,
  scrumInfo: UserInfoModel,
  issues: Array<IssueModel>,
  queue: Array<UserInfoModel>,
  inGame: Array<UserInfoModel>,
}