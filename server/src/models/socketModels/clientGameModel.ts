import { IssueModel } from "./issueModel";
import { UserInfoModel } from "./userInfoModel";

export interface ClientGameModel {
issuesInfo: Array<IssueInfo>,
players: Array<UserInfoModel>,
// master
isVoting: boolean
}

interface IssueInfo {
  issue: IssueModel,
  isVoting: boolean,
  votes: Array<{login:string, score:number}>,
  result?: number
}