import clientService from "../../../../clientService/clientService";
import { useTypedSelector } from "../../../../hooky/useTypedSelector";
import { UserInfo } from "../../../../serverService/models/userInfoModel";
import PlayerCard from "../../Lobby/PlayerCard/PlayerCard";
import {IssueInfo} from "../../../../serverService/models/gameModel";
import "./GameSideBar.scss";

export interface SideBarItemModel {
  userInfo:UserInfo,
  currentIssueInfo:IssueInfo
}

export function GameSideBarItem(props:SideBarItemModel) {
  const game = useTypedSelector((store) => store.game);
  const isScrum = useTypedSelector((store) => store.userInfo.isScrum);
  const userScore = props.currentIssueInfo.votes.find((vote) => vote.login === props.userInfo.login)?.score;

  if(isScrum) {
    return(
      <li className="votes__item">
        <div className="votes__score">{userScore || "In progress"}</div>
        <PlayerCard {...props.userInfo}></PlayerCard>
      </li>
    );
  } else {
    return(
      <li className="votes__item">
        {!game.isVoting ?
          <div className="votes__score">{userScore || "In progress"}</div> :
          <></>
        }
        <PlayerCard {...props.userInfo}></PlayerCard>
      </li>
    )
  }

}