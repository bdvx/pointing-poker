"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const useTypedSelector_1 = require("../../hooky/useTypedSelector");
const LobbyMain_1 = require("../LobbyMain/LobbyMain");
const Settings_1 = require("../Settings/Settings");
require("./Lobby.scss");
const Lobby = () => {
    const roomInfo = useTypedSelector_1.useTypedSelector(store => store.roomInfo);
    return (<div className="Lobby">
      <div className="Lobby__wrapper">
        <div className="Lobby__title">Some random lobby name</div>
        <h1>{roomInfo.roomUrl}</h1>
        <div className="Lobby__routing">
          <react_router_dom_1.Link to={`/lobby`} className="Lobby__link">
            Lobby
          </react_router_dom_1.Link>
          <react_router_dom_1.Link to={`/lobby/settings`} className="Lobby__link">
            Settings
          </react_router_dom_1.Link>
        </div>
        <react_router_dom_1.Route exact path={`/lobby`}>
          <LobbyMain_1.default />
        </react_router_dom_1.Route>
        <react_router_dom_1.Route exact path={`/lobby/settings`}><Settings_1.default /></react_router_dom_1.Route>
      </div>
    </div>);
};
exports.default = Lobby;
//# sourceMappingURL=Lobby.js.map