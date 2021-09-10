import { UserInfoFromDB } from "../httpModels/useFromDBModel"

export interface ClientModel {
  ws:any,
  userInfo:UserInfoFromDB
}