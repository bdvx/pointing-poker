import { useTypedSelector } from "../../hooky/useTypedSelector";
import GameSettings from "./GameSettings/GameSettings";

const Settings = () => {
  const link = useTypedSelector((store) => store.roomInfo.roomUrl);
  const handleCopy = (event: any) => {
    event.target.previousElementSibling?.select();
    document.execCommand("copy");
  };
  return (
    <div className="Settings">
      <div className="Settings__connect">
        {/* <div className="Settings__connect_text">Link to lobby:</div>
        <div className="Settings__connect_link">{link}</div>
        <button className="Settings__connect_copy" onClick={handleCopy}>
          Copy
        </button> */}
      </div>
      <GameSettings />
    </div>
  );
};

export default Settings;
