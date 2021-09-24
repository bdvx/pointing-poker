import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import clientService from "../../../../clientService/clientService";
import { useTypedSelector } from "../../../../hooky/useTypedSelector";
import { IssueModel } from "../../../../serverService/models/issueModel";
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
  clientService.setDispatch(dispatch);
  //! ServerService.setDispatch(dispatch); возможно где-то дублируется
  ServerService.setDispatch(dispatch);
  ServerService.setRouter(router);

/*   useEffect(()=>{//!Это удалить как появится логика добавление issue
    const issue1:IssueModel = {
      link:"https",
      priority:"low",
      title:"test 1",
      id:"1"
    }
    setTimeout(()=>ServerService.makeIssue(issue1),250);
  }, []) */

  const onDisconnectBtnClick = () => {
    ServerService.disconect(userInfo, roomInfo.roomId, `user ${userInfo.login} disconnect the room`);
    dispatch(resetRoomInfo());
    dispatch(resetChat());
    router.push('/welcomePage');
  }

  const onStartGameBtnClick = () => {
    console.log('start');
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
