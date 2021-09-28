import { useState } from "react";
import { IssueEditable } from "../pages/Lobby/IssueEditable/IssueEditable";

const Settings = () => {
  const [issues, setIssues] = useState([
    { title: "random issue", priority: "low", link: "https://google.com" },
  ]);

  return (
    <div className="Settings">
      <div className="Settings__connect">
        <div className="Settings__connect_text">Link to lobby:</div>
        <input
          className="Settings__connect_link"
          defaultValue="https://pokerplanning.com/somelink"
        ></input>
        <button className="Settings__connect_copy">Copy</button>
      </div>
      <div className="Settings__issues">
        <div className="Settings__issues_text">Issues:</div>
        {issues.map((el) => {
          return (
            <IssueEditable title={el.title} priority={el.priority} link={el.link} id="" onDeleteIssue={ ()=> false } />
          );
        })}
      </div>
    </div>
  );
};

export default Settings;
