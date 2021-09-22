"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Issue_1 = require("../pages/Lobby/Issue/Issue");
const Settings = () => {
    const [issues, setIssues] = react_1.useState([
        { title: "random issue", priority: "low", link: "https://google.com" },
    ]);
    return (<div className="Settings">
      <div className="Settings__connect">
        <div className="Settings__connect_text">Link to lobby:</div>
        <input className="Settings__connect_link" defaultValue="https://pokerplanning.com/somelink"></input>
        <button className="Settings__connect_copy">Copy</button>
      </div>
      <div className="Settings__issues">
        <div className="Settings__issues_text">Issues:</div>
        {issues.map((el) => {
            return (<Issue_1.default title={el.title} priority={el.priority} link={el.link}/>);
        })}
      </div>
    </div>);
};
exports.default = Settings;
//# sourceMappingURL=Settings.js.map