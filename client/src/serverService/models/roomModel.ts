import { ChatMessageInfo } from "./chatMessageInfoModel";
import { UserInfo } from "./userInfoModel";


export interface Room {
  roomId: string,
  roomUrl: string,
  players: Array<UserInfo>,
  chat: Array<ChatMessageInfo>,
  isPlaying: boolean
}