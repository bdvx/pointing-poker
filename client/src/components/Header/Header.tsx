import { Avatar } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { useTypedSelector } from "../../hooky/useTypedSelector";
import "./Header.scss";

const Header = () => {
  const { isLogin, avatar, firstName } = useTypedSelector((state) => state.userInfo);

  const changeStringAvatar = (): string | null => {
    if (!firstName) return null;
  
    return (firstName.length) > 1 ? `${firstName[0]}${firstName[firstName.length - 1]}` : `${firstName[0]}`;
  };

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

          { isLogin && 
            <Avatar src={ avatar } children={ changeStringAvatar() } alt="Avatar" />
          }
        </div>
      </header>
    </>
  );
};

export default Header;
