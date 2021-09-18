import { Link, Route } from "react-router-dom";
import { useTypedSelector } from "../../hooky/useTypedSelector";
import LobbyMain from "../LobbyMain/LobbyMain";
import Settings from "../Settings/Settings";
import "./Lobby.scss";

const Lobby = () => {
  const roomInfo = useTypedSelector(store => store.roomInfo)

  return (
    <div className="Lobby">
      <div className="Lobby__wrapper">
        <div className="Lobby__title">Some random lobby name</div>
        <h1>{roomInfo.roomUrl}</h1>
        <div className="Lobby__routing">
          <Link to={`/lobby`} className="Lobby__link">
            Lobby
          </Link>
          <Link to={`/lobby/settings`} className="Lobby__link">
            Settings
          </Link>
        </div>
        <Route exact path={`/lobby`}>
          <LobbyMain />
        </Route>
        <Route exact path={`/lobby/settings`}><Settings/></Route>
      </div>
    </div>
  );
};

export default Lobby;
