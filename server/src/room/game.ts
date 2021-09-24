import { GameModel, IssueInfo } from "../models/socketModels/gameModel";
import { IssueModel } from "../models/socketModels/issueModel";
import { Room } from "../models/socketModels/roomModel";
import { makeWSResponseMessage, transformServerGameToClient } from "../tools/roomunctions";

function makeNewGame(room:Room) {
  const gameInfo:GameModel = {
    issuesInfo: room.issues.map((issue) => makeIssueInfo(issue)) || [],
    isVoting:false,
    players: room.playersWS,
  }
  room.game = gameInfo;
  room.isPlaying = true;

  room.playersWS.forEach((player) => {
    if(room.game) {
      const gameToClient = transformServerGameToClient(room.game);
      const response = makeWSResponseMessage("START_GAME", gameToClient);
      player.ws.send(response);
    }
  })
}

function makeIssueInfo(issue:IssueModel) {
  const issueInfo:IssueInfo = {
    isVoting: false,
    issue: issue,
    votes: [],
    isSelected: false
  }
  return issueInfo;
}

const Game = {
  makeNewGame
}
export default Game;
