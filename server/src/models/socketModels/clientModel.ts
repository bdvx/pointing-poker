import { UserInfoFromDB } from "../httpModels/useFromDBModel"
import { UserInfoModel } from "./userInfoModel";

export interface ClientModel {
  ws:any,
  userInfo:UserInfoModel
}