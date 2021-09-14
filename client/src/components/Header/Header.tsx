import { Link, Route, Switch } from "react-router-dom";
import { StartPage } from "../StartPage/StartPage";
import "./Header.scss";

const Header = () => {
  return (
    <>
      <header className="Header">
        <div className="Header_wrapper">
          <div className="Header_logo"></div>
          <Link to="/home" className="Header_link">
            Home
          </Link>
          <Link to="/about" className="Header_link">
            About
          </Link>
        </div>
      </header>
      <Switch>
        <Route path="/about">About</Route>
        <Route path="/home">
          <StartPage classes="app__startPage" />
        </Route>
      </Switch>
    </>
  );
};

export default Header;
