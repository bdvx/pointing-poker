import { UserInfoFromDB } from "../httpModels/useFromDBModel"
import { UserInfoModel } from "./userInfoModel";

export interface WSClientModel {
  ws:any,
  userInfo:UserInfoModel
}