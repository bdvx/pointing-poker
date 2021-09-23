import { IssueModel } from "./issueModel";
import { UserInfo } from "./userInfoModel";

interface IssueInfo {
  issue: IssueModel,
  isVoting: boolean,
  isSelected: boolean,
  votes: Array<{login:string, score:number}>,
  result?: number
}

export interface GameModel {
  issuesInfo: Array<IssueInfo>,
  players: Array<UserInfo>,
 // master
  isVoting: boolean
}