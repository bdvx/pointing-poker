import { ChatMessageInfo } from "./chatMessageInfoModel";
import { UserInfo } from "./userInfoModel";


export interface Room {
  roomId: string,
  roomUrl: string,
  players: Array<UserInfo>,
  isPlaying: boolean,
  scrumInfo: UserInfo
}