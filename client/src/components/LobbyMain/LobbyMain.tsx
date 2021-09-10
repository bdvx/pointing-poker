import PlayerCard from "../PlayerCard/PlayerCard";
import './LobbyMain.scss'

const LobbyMain = () => {
  return (
    <div className="Lobby__main">
        <div className="Lobby__master">
          <div className="Lobby__master_title">Scrum master:</div>
          <PlayerCard image='' name='David' surname='Blaine' position='Senior Software Developer'/>
          <div className="Lobby__exit-btn"><a></a></div>
        </div>
      <div className="Lobby__members">
        <div className='Lobby__members_title'>Members:</div>
          <div className="Lobby__members_cards">
            <PlayerCard image='./logo192.png' name='John' surname='Meme' position='Senior Software Developer'/>  
            <PlayerCard image='./logo192.png' name='John' surname='Meme' position='Senior Software Developer'/>
            <PlayerCard image='./logo192.png' name='John' surname='Meme' position='Senior Software Developer'/>
            <PlayerCard image='./logo192.png' name='John' surname='Meme' position='Senior Software Developer'/>
            <PlayerCard image='./logo192.png' name='John' surname='Meme' position='Senior Software Developer'/>
            <PlayerCard image='./logo192.png' name='John' surname='Meme' position='Senior Software Developer'/>
            <PlayerCard image='./logo192.png' name='John' surname='Meme' position='Senior Software Developer'/>
            <PlayerCard image='./logo192.png' name='John' surname='Meme' position='Senior Software Developer'/>
            <PlayerCard image='./logo192.png' name='John' surname='Meme' position='Senior Software Developer'/>
        </div>
      </div>
    </div>
  );
};

export default LobbyMain;
