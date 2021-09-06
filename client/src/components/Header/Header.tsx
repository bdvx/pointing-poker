import { Link, Route, Switch } from "react-router-dom";
import AboutPage from "../AboutPage/AboutPage";
import "./Header.scss";

const Header = () => {
  return (
    <>
      <header className="Header">
        <div className="Header_wrapper">
          <div className="Header_logo"></div>
          <Link to="/home" className="Header_link">Home</Link>
          <Link to="/about" className="Header_link">About</Link>
        </div>
      </header>
      <Switch>
        <Route path="/about"><AboutPage/></Route>
        <Route path="/home">Home</Route>
      </Switch>
    </>
  );
};

export default Header;
