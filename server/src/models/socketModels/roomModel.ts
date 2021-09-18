import { ChatMessageInfo } from "./chatMessageInfoModel";
import { WSClientModel } from "./clientModel";
import { UserInfoModel } from "./userInfoModel";

export interface Room {
  roomId: string,
/*   players: Array<UserInfoModel>, */
  roomUrl: string,
  chat: Array<ChatMessageInfo>,
  isPlaying: boolean,
  scrumInfo: UserInfoModel,
  playersWS: Array<WSClientModel>
}