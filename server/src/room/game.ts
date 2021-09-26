import { GameModel, IssueInfo } from "../models/socketModels/gameModel";
import { IssueModel } from "../models/socketModels/issueModel";
import { Room } from "../models/socketModels/roomModel";
import { makeWSResponseMessage, transformServerGameToClient } from "../tools/roomFunctions";

function makeNewGame(room:Room) {
  const gameInfo:GameModel = {
/*     issuesInfo: room.issues.map((issue) => makeIssueInfo(issue)) || [], */
    issuesInfo: [{ //!Удалить это как появится добавление issue
      isSelected: false,
      isVoting: false,
      issue: {
        id:"1",
        link:"https1",
        priorety:"low",
        title:"test 1"
      },
      votes: [],
    },
    {
      isSelected: false,
      isVoting: false,
      issue: {
        id:"2",
        link:"https2",
        priorety:"hight",
        title:"test 2"
      },
      votes: [],
    }
  ],
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
