import { Link, Route, useRouteMatch } from "react-router-dom";
import LobbyMain from "../LobbyMain/LobbyMain";
import Settings from "../Settings/Settings";
import "./Lobby.scss";

const Lobby = () => {
  let { path, url } = useRouteMatch();

  return (
    <div className="Lobby">
      <div className="Lobby__wrapper">
        <div className="Lobby__title">Some random lobby name</div>
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
