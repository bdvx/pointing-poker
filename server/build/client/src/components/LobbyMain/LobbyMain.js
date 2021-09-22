"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PlayerCard_1 = require("../PlayerCard/PlayerCard");
require("./LobbyMain.scss");
const LobbyMain = () => {
    return (<div className="Lobby__main">
        <div className="Lobby__master">
          <div className="Lobby__master_title">Scrum master:</div>
          <PlayerCard_1.default image='' name='David' surname='Blaine' position='Senior Software Developer'/>
          <div className="Lobby__exit-btn"><a></a></div>
        </div>
      <div className="Lobby__members">
        <div className='Lobby__members_title'>Members:</div>
          <div className="Lobby__members_cards">
            <PlayerCard_1.default image='./logo192.png' name='John' surname='Meme' position='Senior Software Developer'/>  
            <PlayerCard_1.default image='./logo192.png' name='John' surname='Meme' position='Senior Software Developer'/>
            <PlayerCard_1.default image='./logo192.png' name='John' surname='Meme' position='Senior Software Developer'/>
            <PlayerCard_1.default image='./logo192.png' name='John' surname='Meme' position='Senior Software Developer'/>
            <PlayerCard_1.default image='./logo192.png' name='John' surname='Meme' position='Senior Software Developer'/>
            <PlayerCard_1.default image='./logo192.png' name='John' surname='Meme' position='Senior Software Developer'/>
            <PlayerCard_1.default image='./logo192.png' name='John' surname='Meme' position='Senior Software Developer'/>
            <PlayerCard_1.default image='./logo192.png' name='John' surname='Meme' position='Senior Software Developer'/>
            <PlayerCard_1.default image='./logo192.png' name='John' surname='Meme' position='Senior Software Developer'/>
        </div>
      </div>
    </div>);
};
exports.default = LobbyMain;
//# sourceMappingURL=LobbyMain.js.map