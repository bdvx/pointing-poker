import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useTypedSelector } from "../../../../hooky/useTypedSelector";
import { IssueModel } from "../../../../serverService/models/issueModel";
import { Room } from "../../../../serverService/models/roomModel";
import ServerService from "../../../../serverService/serverService";
import { resetChat } from "../../../../store/chatSlice";
import { resetRoomInfo } from "../../../../store/roomSlice";
import Chat from "../../../Chat/Chat";
import { CreateIssue } from "../../../CreateIssue/CreateIssue";
import { IssueEditable } from "../IssueEditable/IssueEditable";
import PlayerCard from "../PlayerCard/PlayerCard";
import { Queue } from "../Queue/queue";
import './LobbyMain.scss';

const LobbyMain = () => {
  const roomInfo = useTypedSelector(store => store.roomInfo) as Room;
  const userInfo = useTypedSelector(store => store.userInfo);
  const dispatch = useDispatch();
  const router = useHistory();
  //! ServerService.setDispatch(dispatch); возможно где-то дублируется
  ServerService.setDispatch(dispatch);
  ServerService.setRouter(router);

  const [issues, setIssues] = useState<IssueModel[]>([]);

  const deleteIssue = (currentIssue: IssueModel): void => {
    const updIssues = issues.filter((issue) => issue.id !== currentIssue.id);
    setIssues(updIssues);
  };

  const updateIssue = (currentIssue: IssueModel): void => {
    const updIssues = [...issues];
    const currentIssueIndex = issues.findIndex((issue) => issue.id === currentIssue.id);
    updIssues[currentIssueIndex] = { ...currentIssue };

    setIssues(updIssues);
  };

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
          <PlayerCard {...roomInfo.scrumInfo} avatar={roomInfo.scrumInfo.avatar || './logo192.png'}/>
          <div className="Lobby__exit-btn"><div onClick={onDisconnectBtnClick}></div></div>
        </div>
        <h1>{roomInfo.roomUrl}</h1>
      <div className="Lobby__members">
        <div className='Lobby__members_title'>Members:</div>
          <div className="Lobby__members_cards">
            {roomInfo.inGame.map((player) => {
              return <PlayerCard {...player} avatar={player.avatar || './logo192.png'} />
            })}
        </div>
      </div>

      <br />
      <br />

      <div>
        <h1>Issues:</h1>
        <div>
          {
            issues.map((issue) => (
              <IssueEditable {...issue} onDeleteIssue={ () => deleteIssue(issue) } 
                             onUpdateIssue={ (issue) => updateIssue(issue) } />
            ))
          }
          <br />
        </div>

        <CreateIssue onAddIssue={ (issue) => setIssues([issue, ...issues]) } />
      </div>
    </div>
  );
};

export default LobbyMain;
