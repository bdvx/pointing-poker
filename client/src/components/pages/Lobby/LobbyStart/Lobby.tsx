import { Link, Route } from "react-router-dom";
import LobbyMain from "../LobbyGame/LobbyMain";
import Settings from "../../../Settings/Settings";
import "./Lobby.scss";

const Lobby = () => {
/*   const roomInfo = useTypedSelector(store => store.roomInfo) */
  //! Убрать имя лобби (чья компонента напишите Мише)

  return (
    <div className="Lobby">
      <div className="Lobby__wrapper">
        <div className="Lobby__title">Some random lobby name</div>
        <div className="Lobby__routing">
          <Link to={`/lobbyStart`} className="Lobby__link">
            Lobby
          </Link>
          <Link to={`/lobby/settings`} className="Lobby__link">
            Settings
          </Link>
        </div>
        <Route exact path={`/lobbyStart`}>
          <LobbyMain />
        </Route>
        <Route exact path={`/lobby/settings`}><Settings/></Route>
      </div>
    </div>
  );
};
//! Мб вынести роут в AppRouter.tsx?

export default Lobby;
