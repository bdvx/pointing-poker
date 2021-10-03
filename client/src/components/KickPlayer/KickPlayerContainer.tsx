import { useTypedSelector } from "../../hooky/useTypedSelector";
import { KickPlayerItem } from "./KickPlayer";
import "./KickPlayerContainer";

export function KickPlayerContainer() {
  const votes = useTypedSelector((store) => store.voting);
  console.log(1111,votes)
  return(
    <ul className="KickPlayer__container">
      {votes?.length !== 0 ?
      votes.map((vote) => <KickPlayerItem {...vote}/>) :
      <></>}
    </ul>
  )
}