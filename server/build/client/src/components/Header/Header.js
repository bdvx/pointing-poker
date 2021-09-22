"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
require("./Header.scss");
const Header = () => {
    return (<>
      <header className="Header">
        <div className="Header_wrapper">
          <div className="Header_logo"></div>
          <react_router_dom_1.NavLink to="/" className="Header_link">
            Home
          </react_router_dom_1.NavLink>
          <react_router_dom_1.NavLink to="/about" className="Header_link">
            About
          </react_router_dom_1.NavLink>
        </div>
      </header>
    </>);
};
exports.default = Header;
//# sourceMappingURL=Header.js.map