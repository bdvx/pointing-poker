import { Route, Switch, useLocation, Redirect, BrowserRouter } from 'react-router-dom';
import { StartPage } from "./components/pages/StartPage/StartPage";
import { AboutPage } from "./components/pages/AboutPage/aboutPage";
import { WelcomePage } from "./components/pages/WelcomePage/WelcomePage";
import Lobby from "./components/pages/Lobby/LobbyStart/Lobby";

export default function AppRouter() {
  let location =  useLocation();

  return(
    <>
      <Switch  location={location}>
        <Route exact path={`/home`}>
          <StartPage classes="App__startPage"></StartPage>
        </Route>
        <Route exact path={'/about'}>
          <AboutPage></AboutPage>
        </Route>
        <Route exact path={'/welcomePage'}>
          <WelcomePage classes="App__welcomePage"></WelcomePage>
        </Route>
        <Route exact path={'/lobbyStart'}>
          <Lobby></Lobby>
        </Route>
        <Route exact path="/">
          <Redirect to='/home'></Redirect>
        </Route>
      </Switch>
    </>
  );
}