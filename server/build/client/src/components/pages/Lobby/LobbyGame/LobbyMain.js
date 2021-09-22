"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const react_router_1 = require("react-router");
const clientService_1 = require("../../../../clientService/clientService");
const useTypedSelector_1 = require("../../../../hooky/useTypedSelector");
const serverService_1 = require("../../../../serverService/serverService");
const roomSlice_1 = require("../../../../store/roomSlice");
const Chat_1 = require("../../../Chat/Chat");
const PlayerCard_1 = require("../PlayerCard/PlayerCard");
require("./LobbyMain.scss");
const LobbyMain = () => {
    const roomInfo = useTypedSelector_1.useTypedSelector(store => store.roomInfo);
    const userInfo = useTypedSelector_1.useTypedSelector(store => store.userInfo);
    const dispatch = react_redux_1.useDispatch();
    clientService_1.default.setDispatch(dispatch);
    const router = react_router_1.useHistory();
    const onDisconnectBtnClick = () => {
        serverService_1.default.disconect(userInfo, roomInfo.roomId, `user ${userInfo.login} disconnect the room`);
        dispatch(roomSlice_1.resetRoomInfo());
        router.push('/welcomePage');
    };
    const onStartGameBtnClick = () => {
        serverService_1.default.startGame();
    };
    //TODO на страничку нужно разместить url инвайта roomInfo.roomUrl
    return (<div className="Lobby__main">
      <Chat_1.default />
        <div className="Lobby__master">
          <div className="Lobby__master_title">Scrum master:</div>
          <PlayerCard_1.default image={roomInfo.scrumInfo.avatar || './logo192.png'} name={roomInfo.scrumInfo.firstName} surname={roomInfo.scrumInfo.lastName} position={roomInfo.scrumInfo.jobPosition}/>
          <div className="Lobby__exit-btn"><div onClick={onDisconnectBtnClick}></div></div>
        </div>
        <h1>{roomInfo.roomUrl}</h1>
        <h2>{Date.now()}</h2>
      <div className="Lobby__members">
        <div className='Lobby__members_title'>Members:</div>
          <div className="Lobby__members_cards">
            {roomInfo.inGame.map((player) => {
            return <PlayerCard_1.default image={player.avatar || './logo192.png'} name={player.firstName} surname={player.lastName} position={player.jobPosition}/>;
        })}
        </div>
      </div>
    </div>);
};
exports.default = LobbyMain;
//# sourceMappingURL=LobbyMain.js.map