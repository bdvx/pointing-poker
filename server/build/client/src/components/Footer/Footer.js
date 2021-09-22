"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Footer = void 0;
require("./Footer.scss");
const constants_1 = require("../../constants");
const rsschool_svg_1 = require("../../assets/icons/rsschool.svg");
const Footer = () => {
    return (<footer className="Footer">
      <div className="Footer__container">
        <a className="Footer__rss" href="https://rs.school/js/" target="_blank" rel="noopener noreferrer">
          <img src={rsschool_svg_1.default} alt="RS School"/>
          <span>'21</span>
        </a>
        
        <ul className="Footer__githubList">
          {constants_1.APP_AUTHORS_GITHUB_USERNAME.map((username) => (<li key={username}>
                <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">&copy;{username}</a>
              </li>))}
        </ul>
      </div>
    </footer>);
};
exports.Footer = Footer;
//# sourceMappingURL=Footer.js.map