import { ChatMessageInfo } from "../../../../client/src/serverService/models/chatMessageInfoModel";
import { UserInfoModel } from "./userInfoModel";

export interface RoomToClient {
  roomId: string,
  players: Array<UserInfoModel>,
  roomUrl: string,
  chat: Array<ChatMessageInfo>,
  isPlaying: boolean,
  scrumInfo: UserInfoModel,
}