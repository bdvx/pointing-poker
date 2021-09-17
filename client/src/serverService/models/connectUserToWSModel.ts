import { UserInfo } from "./userInfoModel";

export interface ConnectUserToWS {
  userInfo: UserInfo,
  roomId: string
}