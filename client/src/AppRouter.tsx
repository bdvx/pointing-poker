import Header from "./components/Header/Header";
import { Route, Switch, useLocation, Redirect, BrowserRouter } from 'react-router-dom';
import { StartPage } from "./components/pages/StartPage/StartPage";
import { AboutPage } from "./components/pages/AboutPage/aboutPage";
import { WelcomePage } from "./components/pages/WelcomePage/WelcomePage";

export default function AppRouter() {
  let location =  useLocation();

  return(
    <>
      <Switch  location={location}>
        <Route exact path={`/home`}>
          <StartPage classes="app__startPage"></StartPage>
        </Route>
        <Route exact path={'/about'}>
          <AboutPage></AboutPage>
        </Route>
        <Route exact path={'/welcomePage'}>
          <WelcomePage classes="app__welcome-page"></WelcomePage>
        </Route>
      
        <Route exact path="/">
          <Redirect to='/home'></Redirect>
        </Route>
      </Switch>
    </>
  );
}