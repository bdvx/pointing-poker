import { useTypedSelector } from "../../hooky/useTypedSelector";
import { handleDragAndDrop } from "../../tool/dragAndDrop";
import { KickPlayerItem } from "./KickPlayer";
import "./KickPlayer.scss";

export function KickPlayerContainer() {
  const votes = useTypedSelector((store) => store.voting);

  return (
    <ul className="KickPlayer__container draggable" onMouseDown={handleDragAndDrop}>
      { votes?.length !== 0
        ? votes.map((vote) => <KickPlayerItem { ...vote } />)
        : null
      }
    </ul>
  )
}