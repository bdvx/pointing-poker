import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useTypedSelector } from "../../../../hooky/useTypedSelector";
import ServerService from "../../../../serverService/serverService";
import { resetRoomInfo } from "../../../../store/roomSlice";
import PlayerCard from "../PlayerCard/PlayerCard";
import './LobbyMain.scss';

const LobbyMain = () => {
  const roomInfo = useTypedSelector(store => store.roomInfo);
  const userInfo = useTypedSelector(store => store.userInfo);
  const dispatch = useDispatch();
  const router = useHistory();

  const onDisconnectBtnClick = () => {
    ServerService.disconect(userInfo, roomInfo.roomId, `user ${userInfo.login} disconnect the room`);
    dispatch(resetRoomInfo());
    router.push('/welcomePage');
  }

    //TODO на страничку нужно разместить url инвайта roomInfo.roomUrl
  return (
    <div className="Lobby__main">
        <div className="Lobby__master">
          <div className="Lobby__master_title">Scrum master:</div>
          <PlayerCard image={roomInfo.scrumInfo.avatar || './logo192.png'} name={roomInfo.scrumInfo.firstName} 
                      surname={roomInfo.scrumInfo.lastName} position={roomInfo.scrumInfo.jobPosition}/>
          <div className="Lobby__exit-btn"><div onClick={onDisconnectBtnClick}></div></div>
        </div>
        <h1>{roomInfo.roomUrl}</h1>
        <h2>{Date.now()}</h2>
      <div className="Lobby__members">
        <div className='Lobby__members_title'>Members:</div>
          <div className="Lobby__members_cards">
            {roomInfo.inGame.map((player) => {
              return <PlayerCard image={player.avatar || './logo192.png'} name={player.firstName} 
                          surname={player.lastName} position={player.jobPosition}/>
            })}
        </div>
      </div>
    </div>
  );
};

export default LobbyMain;
