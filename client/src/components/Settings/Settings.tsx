import { useState } from "react";
import { useTypedSelector } from "../../hooky/useTypedSelector";
import { CreateIssue } from "../CreateIssue/CreateIssue";
import { IssueEditable } from "../pages/Lobby/IssueEditable/IssueEditable";

const Settings = () => {
  const issuesInfo = useTypedSelector((store) => store.roomInfo.issues);
  
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
        <CreateIssue></CreateIssue>
        <div className="Settings__issues_text">Issues:</div>
        {issuesInfo.map((issueInfo) => {
          return (
            <IssueEditable {...issueInfo} id=""/>
          );
        })}
      </div>
    </div>
  );
};

export default Settings;
