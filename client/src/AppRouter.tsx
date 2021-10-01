import { Route, Switch } from "react-router-dom";
import { StartPage } from "./components/pages/StartPage/StartPage";
import { WelcomePage } from "./components/pages/WelcomePage/WelcomePage";
import { Game } from "./components/pages/GamePage/Game/Game";
import { useTypedSelector } from "./hooky/useTypedSelector";
import AboutPage from "./components/pages/AboutPage/AboutPage";
import { StatisticsPage } from "./components/pages/StatisticsPage/StatisticsPage";
import { PrivateRoute } from "./components/Base/PrivateRoute";
import Lobby from "./components/pages/Lobby/LobbyStart/Lobby";

const ROUTES = [
  { path: '/welcomePage', Component: WelcomePage },
  { path: '/lobbyStart', Component: Lobby },
  { path: '/lobby/settings', Component: Lobby },
  { path: '/game', Component: Game },
  { path: '/statistics', Component: StatisticsPage }
];

export default function AppRouter() {
  const { isLogin } = useTypedSelector((state) => state.userInfo);

  return (
    <Switch>
      <Route path="/" component={ StartPage } exact />
      <Route path="/about" component={ AboutPage } exact />

      { ROUTES.map(({ path, Component }) => (
          <PrivateRoute authed={ isLogin || false } path={ path } component={ Component } exact key={ path } />
        ))
      }
    </Switch>
  );
}