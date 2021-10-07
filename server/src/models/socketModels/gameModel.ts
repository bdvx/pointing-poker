import { WSClientModel } from "./clientModel";
import { IssueModel } from "./issueModel";

export interface IssueInfo {
  issue: IssueModel,
  isVoting: boolean,
  isSelected: boolean
  votes: Array<{login:string, score:number}>,
  result?: number
}

export interface GameModel {
  issuesInfo: Array<IssueInfo>,
  players: Array<WSClientModel>,
 // master
  isVoting: boolean,
  voteTime?:number
}