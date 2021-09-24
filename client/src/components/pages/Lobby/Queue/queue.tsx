import { useTypedSelector } from "../../../../hooky/useTypedSelector";
import { QueuePerson } from "./queuePerson";
import "./queue.scss";
import { handleDragAndDrop } from "../../../../tool/dragAndDrop";

export function Queue() {
  const room = useTypedSelector(store => store.roomInfo);
  return(
  <ul className="queue draggable" onMouseDown={handleDragAndDrop}>
    {room.queue.map((playerInQ) => <QueuePerson {...playerInQ} />)}
  </ul>);
}