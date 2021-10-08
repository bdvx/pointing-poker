import { UserInfoModel } from "./userInfoModel";

export interface ConnectUserToWS {
  userInfo: UserInfoModel,
  roomId: string
}