import { NavLink } from "react-router-dom";
import { StartPage } from "../pages/StartPage/StartPage";
import "./Header.scss";

const Header = () => {
  return (
    <>
      <header className="Header">
        <div className="Header_wrapper">
          <div className="Header_logo"></div>
          <NavLink to="/welcomePage" className="Header_link">
            Home
          </NavLink>
          <NavLink to="/about" className="Header_link">
            About
          </NavLink>
        </div>
      </header>
    </>
  );
};

export default Header;
