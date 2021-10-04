import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useTypedSelector } from "../../../../hooky/useTypedSelector";
import ServerService from "../../../../serverService/serverService";
import { resetChat } from "../../../../store/chatSlice";
import { resetRoomInfo } from "../../../../store/roomSlice";
import Chat from "../../../Chat/Chat";
import { KickPlayerContainer } from "../../../KickPlayer/KickPlayerContainer";
import IssueNonEdiitable from "../IssueNonEditable/IssueNonEditable";
import PlayerCard from "../PlayerCard/PlayerCard";
import { Queue } from "../Queue/queue";
import './LobbyMain.scss';

const LobbyMain = () => {
  const roomInfo = useTypedSelector(store => store.roomInfo);
  const userInfo = useTypedSelector(store => store.userInfo);
  const dispatch = useDispatch();
  const router = useHistory();
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
      <KickPlayerContainer></KickPlayerContainer>
        <div className="Lobby__master">
          <div className="Lobby__master_title">Scrum master:</div>
          <div onClick={onStartGameBtnClick} className='Lobby__start-btn'><div></div></div>
          <PlayerCard {...roomInfo.scrumInfo} avatar={roomInfo.scrumInfo.avatar}/>
          <div className="Lobby__exit-btn"><div onClick={onDisconnectBtnClick}></div></div>
        </div>
        <div className="Lobby__issues">
          { roomInfo.issues.length !== 0 &&
            roomInfo.issues.map((issue) => (
              <IssueNonEdiitable {...issue} />
            ))
        }
        </div>
        <h1>{roomInfo.roomUrl}</h1>
      <div className="Lobby__members">
        <div className='Lobby__members_title'>Members:</div>
          <div className="Lobby__members_cards">
            {roomInfo.inGame.map((player) => {
              return <PlayerCard {...player} avatar={player.avatar} />
            })}
        </div>
      </div>
    </div>
  );
};

export default LobbyMain;
