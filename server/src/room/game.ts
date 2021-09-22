import { ChoiceModel } from "../models/socketModels/choiceModel";
import { GameModel, IssueInfo } from "../models/socketModels/gameModel";
import { IssueModel } from "../models/socketModels/issueModel";
import { Room } from "../models/socketModels/roomModel";
import { makeWSResponseMessage, transformServerRoomToClient } from "../tools/queryFunctions";

function makeNewGame(room:Room) {
  const gameInfo:GameModel = {
    issuesInfo: room.issues.map((issue) => makeIssueInfo(issue)),
    isVoting:false,
    players: room.playersWS
  }
  room.game = gameInfo;
  room.isPlaying = true;

  room.playersWS.forEach((player) => {
    const gameToClient = transformServerRoomToClient(room);
    const response = makeWSResponseMessage("START_GAME", gameToClient);
    player.ws.send(response);
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


/* room.playersWS.forEach((player) => {
  sendUpdatedGame(room, player.ws);
}) */