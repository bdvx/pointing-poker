import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useTypedSelector } from "../../../../hooky/useTypedSelector";
import ServerService from "../../../../serverService/serverService";
import { resetChat } from "../../../../store/chatSlice";
import { resetRoomInfo } from "../../../../store/roomSlice";
import Chat from "../../../Chat/Chat";
import PlayerCard from "../PlayerCard/PlayerCard";
import { Queue } from "../Queue/queue";
import './LobbyMain.scss';

const LobbyMain = () => {
  const roomInfo = useTypedSelector(store => store.roomInfo);
  const userInfo = useTypedSelector(store => store.userInfo);
  const dispatch = useDispatch();
  const router = useHistory();
  //! ServerService.setDispatch(dispatch); возможно где-то дублируется
  ServerService.setDispatch(dispatch);
  ServerService.setRouter(router);

  const onDisconnectBtnClick = () => {
    ServerService.disconect(userInfo, roomInfo.roomId, `user ${userInfo.login} disconnect the room`);
    dispatch(resetRoomInfo());
    dispatch(resetChat());
    router.push('/welcomePage');
  }

  const onStartGameBtnClick = () => {
    ServerService.startGame();
  }

    //TODO на страничку нужно разместить url инвайта roomInfo.roomUrl
  return (
    <div className="Lobby__main">
      <Chat />
      <Queue />
        <div className="Lobby__master">
          <div className="Lobby__master_title">Scrum master:</div>
          <button onClick={onStartGameBtnClick}>STart Game</button>
          <button >Add Issue</button>
          <PlayerCard avatar={roomInfo.scrumInfo.avatar || './logo192.png'} firstName={roomInfo.scrumInfo.firstName} 
                      lastName={roomInfo.scrumInfo.lastName} jobPosition={roomInfo.scrumInfo.jobPosition} login={roomInfo.scrumInfo.login}/>
          <div className="Lobby__exit-btn"><div onClick={onDisconnectBtnClick}></div></div>
        </div>
        <h1>{roomInfo.roomUrl}</h1>
      <div className="Lobby__members">
        <div className='Lobby__members_title'>Members:</div>
          <div className="Lobby__members_cards">
            {roomInfo.inGame.map((player) => {
              return <PlayerCard avatar={player.avatar || './logo192.png'} firstName={player.firstName} 
                        lastName={player.lastName} jobPosition={player.jobPosition} login={player.login}/>
            })}
        </div>
      </div>
    </div>
  );
};

export default LobbyMain;
