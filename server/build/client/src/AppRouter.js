"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const StartPage_1 = require("./components/pages/StartPage/StartPage");
const aboutPage_1 = require("./components/pages/AboutPage/aboutPage");
const WelcomePage_1 = require("./components/pages/WelcomePage/WelcomePage");
const Lobby_1 = require("./components/pages/Lobby/LobbyStart/Lobby");
function AppRouter() {
    let location = react_router_dom_1.useLocation();
    return (<>
      <react_router_dom_1.Switch location={location}>
        <react_router_dom_1.Route exact path={`/home`}>
          <StartPage_1.StartPage classes="App__startPage"></StartPage_1.StartPage>
        </react_router_dom_1.Route>
        <react_router_dom_1.Route exact path={'/about'}>
          <aboutPage_1.AboutPage></aboutPage_1.AboutPage>
        </react_router_dom_1.Route>
        <react_router_dom_1.Route exact path={'/welcomePage'}>
          <WelcomePage_1.WelcomePage classes="App__welcomePage"></WelcomePage_1.WelcomePage>
        </react_router_dom_1.Route>
        <react_router_dom_1.Route exact path={'/lobbyStart'}>
          <Lobby_1.default></Lobby_1.default>
        </react_router_dom_1.Route>
        <react_router_dom_1.Route exact path="/">
          <react_router_dom_1.Redirect to='/home'></react_router_dom_1.Redirect>
        </react_router_dom_1.Route>
      </react_router_dom_1.Switch>
    </>);
}
exports.default = AppRouter;
//# sourceMappingURL=AppRouter.js.map