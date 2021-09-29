import { Switch, TextField } from "@material-ui/core";
import { ChangeEvent, useState } from "react";
import "./GameSettings.scss";

const GameSettings = () => {
  const [MasterAsPlayer, SetMasterAsPlayer] = useState(false);
  const [AutoTurn, SetAutoTurn] = useState(false);
  const [TimerNeeded, SetTimerNeeded] = useState(false);
  const [ScoreType, setScoreType] = useState("Story Points");
  const [ShortScoreType, setShortScoreType] = useState("SP");

  const handleMaster = () => {
    SetMasterAsPlayer(!MasterAsPlayer);
  };
  const handleTurn = () => {
    SetAutoTurn(!AutoTurn);
  };
  const handleTimer = () => {
    SetTimerNeeded(!TimerNeeded);
  };
  const handleScoreType = (event: ChangeEvent) => {
    setScoreType((event.target as HTMLInputElement).value);
  };

  const handleShortScoreType = (event: ChangeEvent) => {
    setShortScoreType((event.target as HTMLInputElement).value);
  };

  return (
    <div className="GameSettings">
      <h3 className="GameSettings__title">Game Settings</h3>
      <div className="GameSettings__element">
        <div className="GameSettings__element_title">
          Scrum master as player:
        </div>
        <Switch onChange={handleMaster}></Switch>
      </div>
      <div className="GameSettings__element">
        <div className="GameSettings__element_title">
          Changing card in round end:
        </div>
        <Switch onChange={handleTurn}></Switch>
      </div>
      <div className="GameSettings__element">
        <div className="GameSettings__element_title">Is timer needed:</div>
        <Switch onChange={handleTimer}></Switch>
      </div>
      <div className="GameSettings__element">
        <div className="GameSettings__element_title">Score type:</div>
        <TextField
          defaultValue="Story Points"
          onChange={handleScoreType}
        ></TextField>
      </div>
      <div className="GameSettings__element">
        <div className="GameSettings__element_title">Score type(short):</div>
        <TextField
          defaultValue="SP"
          onChange={handleShortScoreType}
        ></TextField>
      </div>
    </div>
  );
};

export default GameSettings;
