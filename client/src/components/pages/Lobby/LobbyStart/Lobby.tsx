import { Link, Route } from "react-router-dom";
import LobbyMain from "../LobbyGame/LobbyMain";
import Settings from "../../../Settings/Settings";
import "./Lobby.scss";
import { useTypedSelector } from "../../../../hooky/useTypedSelector";
import { CSSProperties } from "@mui/system";
import { BASE_URL } from "../../../../constants";

const Lobby = () => {
  //! Убрать имя лобби (чья компонента напишите Мише)

  const isScrum = useTypedSelector((store) => store.userInfo.isScrum);
  let link;
  let style;
  if (isScrum) {
    link = (
      <Link to={`${BASE_URL}/lobby/settings`} className="Lobby__link">
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
          <Link to={`${BASE_URL}/lobbyStart`} className="Lobby__link">
            Lobby
          </Link>
          {link}
        </div>
        <Route exact path={`${BASE_URL}/lobbyStart`}>
          <LobbyMain />
        </Route>
        <Route exact path={`${BASE_URL}/lobby/settings`}>
          <Settings />
        </Route>
      </div>
    </div>
  );
};
//! Мб вынести роут в AppRouter.tsx?

export default Lobby;
