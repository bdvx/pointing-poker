import { Link, Route } from "react-router-dom";
import LobbyMain from "../LobbyGame/LobbyMain";
import Settings from "../../../Settings/Settings";
import "./Lobby.scss";
import { useTypedSelector } from "../../../../hooky/useTypedSelector";
import { CSSProperties } from "@mui/system";

const Lobby = () => {
  //! Убрать имя лобби (чья компонента напишите Мише)

  const isScrum = useTypedSelector((store) => store.userInfo.isScrum);
  let link;
  let style;
  if (isScrum) {
    link = (
      <Link to={`/lobby/settings`} className="Lobby__link">
        Settings
      </Link>
    );
    style = {};
  } else {
    link = null;
    style = { justifyContent: "center" };
  }

  return (
    <div className="Lobby">
      <div className="Lobby__wrapper">
        <div className="Lobby__routing" style={style}>
          <Link to={`/lobbyStart`} className="Lobby__link">
            Lobby
          </Link>
          {link}
        </div>
        <Route exact path={`/lobbyStart`}>
          <LobbyMain />
        </Route>
        <Route exact path={`/lobby/settings`}>
          <Settings />
        </Route>
      </div>
    </div>
  );
};
//! Мб вынести роут в AppRouter.tsx?

export default Lobby;
