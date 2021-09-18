import { useTypedSelector } from "../../../../hooky/useTypedSelector";
import PlayerCard from "../PlayerCard/PlayerCard";
import './LobbyMain.scss'

const LobbyMain = () => {
  const roomInfo = useTypedSelector(store => store.roomInfo);
  //TODO на страничку нужно разместить url инвайта roomInfo.roomUrl
  console.log(roomInfo.players)
  return (
    <div className="Lobby__main">
        <div className="Lobby__master">
          <div className="Lobby__master_title">Scrum master:</div>
          <PlayerCard image={roomInfo.scrumInfo.avatar || './logo192.png'} name={roomInfo.scrumInfo.firstName} 
                      surname={roomInfo.scrumInfo.lastName} position={roomInfo.scrumInfo.jobPosition}/>
          <div className="Lobby__exit-btn"><a></a></div>
        </div>
        <h1>{roomInfo.roomUrl}</h1>
      <div className="Lobby__members">
        <div className='Lobby__members_title'>Members:</div>
          <div className="Lobby__members_cards">
            {roomInfo.players.map((player) => {
              return <PlayerCard image={player.avatar || './logo192.png'} name={player.firstName} 
                          surname={player.lastName} position={player.jobPosition}/>
            })}
        </div>
      </div>
    </div>
  );
};

export default LobbyMain;
