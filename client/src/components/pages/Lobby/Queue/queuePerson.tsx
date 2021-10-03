import { useTypedSelector } from "../../../../hooky/useTypedSelector";
import { UserInfo } from "../../../../serverService/models/userInfoModel";
import ServerService from "../../../../serverService/serverService";
import PlayerCard from "../PlayerCard/PlayerCard";

export function QueuePerson(userInfo:UserInfo) {
  const isScrum = useTypedSelector((store) => store.userInfo.isScrum);
  const onAddBtnClick = () => {
    ServerService.movePlayerFromQueueToGame(userInfo.login);
  }

  return(
    <li className="queue__person">
      {isScrum ?
      <button className="queue__addBtn" onClick={onAddBtnClick}>+</button> :
      <></>
      }
      <PlayerCard {...userInfo}></PlayerCard>
    </li>
  );
}