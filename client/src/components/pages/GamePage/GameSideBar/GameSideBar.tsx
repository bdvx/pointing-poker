import { useTypedSelector } from "../../../../hooky/useTypedSelector";
import { GameSideBarItem } from "./GameSideBarItem";
import './GameSideBar.scss'

export function GameSideBar() {
  const game = useTypedSelector((store) => store.game);
  const currentIssue = game.issuesInfo.find((issueInfo) => issueInfo.isSelected);

  if(currentIssue) {
    return(
      <ul className="votes">
        {game.players.map((player) => <GameSideBarItem userInfo={player} 
                                      currentIssueInfo={currentIssue}></GameSideBarItem>)}
      </ul>
    );
  }

  return (
    <ul className="votes">

    </ul>
  )
}