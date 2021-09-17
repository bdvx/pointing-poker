import { UserInfo } from "./userInfoModel";


export interface Room {
  roomId: string,
  players: Array<UserInfo>,
}