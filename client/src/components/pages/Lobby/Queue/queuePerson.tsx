import { UserInfo } from "../../../../serverService/models/userInfoModel";
import ServerService from "../../../../serverService/serverService";
import PlayerCard from "../PlayerCard/PlayerCard";

export function QueuePerson(userInfo:UserInfo) {

  const onAddBtnClick = () => {
    ServerService.movePlayerFromQueueToGame(userInfo.login);
  }

  return(
    <li className="queue__person">
      <button onClick={onAddBtnClick}>Add</button>
      <PlayerCard {...userInfo}></PlayerCard>
    </li>
  );
}