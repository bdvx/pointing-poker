import {
  Route,
  Switch,
  useLocation,
  Redirect,
  BrowserRouter,
} from "react-router-dom";
import { StartPage } from "./components/pages/StartPage/StartPage";
import { WelcomePage } from "./components/pages/WelcomePage/WelcomePage";
import Lobby from "./components/pages/Lobby/LobbyStart/Lobby";
import { Game } from "./components/pages/GamePage/Game/Game";
import { useTypedSelector } from "./hooky/useTypedSelector";
import AboutPage from "./components/pages/AboutPage/AboutPage";
import { StatisticsPage } from "./components/pages/StatisticsPage/StatisticsPage";


export default function AppRouter() {
  let location = useLocation();
  const user = useTypedSelector((state) => state.userInfo);

  return (
    <>
      <Switch location={location}>
        <Route exact path={`/home`}>
          {() => {
            if (user.isLogin === false) {
             return <StartPage classes="App__startPage"></StartPage>;
            } else {
              return <Redirect to='/welcomePage'></Redirect>
            }
          }}
        </Route>
        <Route exact path={"/about"}>
          <AboutPage></AboutPage>
        </Route>
        <Route exact path={"/welcomePage"}>
        {() => {
            if (user.isLogin === true) {
             return <WelcomePage classes="App__welcomePage"></WelcomePage>
            } else {
              return <Redirect to='/home'></Redirect>
            }
          }}
        </Route>
        <Route exact path={"/lobbyStart"}>
          <Lobby></Lobby>
        </Route>
        <Route exact path="/">
          <Redirect to="/home"></Redirect>
        </Route>
        <Route exact path={"/statistics"}>
          <StatisticsPage></StatisticsPage>
        </Route>
        <Route exact path="/game">
          <Game></Game>
        </Route>
      </Switch>
    </>
  );
}