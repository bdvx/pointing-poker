import { useTypedSelector } from "../../hooky/useTypedSelector";
import { KickPlayerItem } from "./KickPlayer";
import "./KickPlayer.scss";

export function KickPlayerContainer() {
  const votes = useTypedSelector((store) => store.voting);

  return(
    <ul className="KickPlayer__container">
      {votes?.length !== 0 ?
      votes.map((vote) => <KickPlayerItem {...vote}/>) :
      <></>}
    </ul>
  )
}