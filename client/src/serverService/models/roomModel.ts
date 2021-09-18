import { UserInfo } from "./userInfoModel";


export interface Room {
  roomId: string,
  roomUrl: string,
  players: Array<UserInfo>,
}