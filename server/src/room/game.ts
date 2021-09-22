import { GameModel, IssueInfo } from "../models/socketModels/gameModel";
import { IssueModel } from "../models/socketModels/issueModel";
import { Room } from "../models/socketModels/roomModel";

function makeNewGame(room:Room) {
  const gameInfo:GameModel = {
    issuesInfo: room.issues.map((issue) => makeIssueInfo(issue)),
    isVoting:false,
    players: room.playersWS
  }
  room.game = gameInfo;
  room.isPlaying = true;
}

function makeIssueInfo(issue:IssueModel) {
  const issueInfo:IssueInfo = {
    isVoting: false,
    issue: issue,
    votes: [],
  }
  return issueInfo;
}

const Game = {
  makeNewGame
}
export default Game;