import { Switch, TextField } from "@material-ui/core";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../hooky/useTypedSelector";
import ServerService from "../../../serverService/serverService";
import { setCardType, SettingsModel } from "../../../store/settingsSlice";
import { CreateIssue } from "../../CreateIssue/CreateIssue";
import CardSettings from "../../pages/Lobby/CardSettings/CardSettings";
import { IssueEditable } from "../../pages/Lobby/IssueEditable/IssueEditable";
import { RoundTimeEditable } from "../../RoundTimeEditable/RoundTimeEditable";
import "./GameSettings.scss";

const GameSettings = () => {
  const [MasterAsPlayer, SetMasterAsPlayer] = useState(false);
  const [AutoTurn, SetAutoTurn] = useState(false);
  const [TimerNeeded, SetTimerNeeded] = useState(false);
  const [ScoreType, setScoreType] = useState("Story Points");
  const [ShortScoreType, setShortScoreType] = useState("SP");
  const [seconds, setSeconds] = useState<number>(40);
  const [minutes, setMinutes] = useState<number>(0);
  const cards = useTypedSelector((store) => store.settings.cards);
  const dispatch = useDispatch();

  const { issues } = useTypedSelector(store => store.roomInfo);

  //! сделать как один обьект типа SettingsModel 
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
    const value = (event.target as HTMLInputElement).value;
    dispatch(setCardType(value));
    setShortScoreType(value);
  };

  const onSaveBtnClick = () => {
    const settings:SettingsModel = {
      autoTurn: AutoTurn,
      masterAsPlayer: MasterAsPlayer,
      roundTime: (minutes) * 60 + seconds,
      scoreType: ScoreType,
      shortScoreType: ShortScoreType,
      timerNeeded: TimerNeeded,
      cards: cards
    }
    ServerService.setSettings(settings);
  }

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
      <div className="GameSettings__element">
        <div className="GameSettings__element_title">Round time:</div>
        <RoundTimeEditable seconds={ seconds } setSeconds={ setSeconds } minutes={ minutes } setMinutes={ setMinutes }/>
      </div>
      <CardSettings cards={cards}/>
      <button className="GameSettings__save" onClick={onSaveBtnClick}>save</button>
    </div>
  );
};

export default GameSettings;
