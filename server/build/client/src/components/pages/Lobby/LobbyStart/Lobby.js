"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const LobbyMain_1 = require("../LobbyGame/LobbyMain");
const Settings_1 = require("../../../Settings/Settings");
require("./Lobby.scss");
const Lobby = () => {
    /*   const roomInfo = useTypedSelector(store => store.roomInfo) */
    //! Убрать имя лобби (чья компонента напишите Мише)
    return (<div className="Lobby">
      <div className="Lobby__wrapper">
        <div className="Lobby__title">Some random lobby name</div>
        <div className="Lobby__routing">
          <react_router_dom_1.Link to={`/lobbyStart`} className="Lobby__link">
            Lobby
          </react_router_dom_1.Link>
          <react_router_dom_1.Link to={`/lobby/settings`} className="Lobby__link">
            Settings
          </react_router_dom_1.Link>
        </div>
        <react_router_dom_1.Route exact path={`/lobbyStart`}>
          <LobbyMain_1.default />
        </react_router_dom_1.Route>
        <react_router_dom_1.Route exact path={`/lobby/settings`}><Settings_1.default /></react_router_dom_1.Route>
      </div>
    </div>);
};
//! Мб вынести роут в AppRouter.tsx?
exports.default = Lobby;
//# sourceMappingURL=Lobby.js.map