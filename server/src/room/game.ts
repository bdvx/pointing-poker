import { GameModel, IssueInfo } from "../models/socketModels/gameModel";
import { IssueModel } from "../models/socketModels/issueModel";
import { Room } from "../models/socketModels/roomModel";
import { makeWSResponseMessage, sendTechnicalMessage, transformServerGameToClient } from "../tools/roomFunctions";

function makeNewGame(room:Room) {
  const scrumLogin = room.scrumInfo.login;
  if(room.settings.masterAsPlayer) {
    const scrumWs = room.playersWS.find((playerWs) => playerWs.userInfo.login === scrumLogin);
    if(scrumWs) {
      room.inGame.push(scrumWs);
    }
  }
  const gameInfo:GameModel = {
    issuesInfo: room.issues.map((issue) => makeIssueInfo(issue)) || [],
    isVoting:false,
    players: room.inGame,
  }
  room.game = gameInfo;
  room.isPlaying = true;

  room.playersWS.forEach((player) => {
    if(room.game) {
      const gameToClient = transformServerGameToClient(room.game);
      const response = makeWSResponseMessage("START_GAME", gameToClient);
      player.ws.send(response);
    }
  });

  sendTechnicalMessage(room, "master start the game");
}
 
export function makeIssueInfo(issue:IssueModel) {
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
