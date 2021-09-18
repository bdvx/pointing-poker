import { ChatMessageInfo } from "./chatMessageInfoModel";
import { WSClientModel } from "./clientModel";

export interface Room {
  roomId: string,
  players: Array<WSClientModel>,
  roomUrl: string,
  chat: Array<ChatMessageInfo>,
  isPlaying: boolean
}