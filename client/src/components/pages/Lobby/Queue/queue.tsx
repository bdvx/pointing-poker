import { useTypedSelector } from "../../../../hooky/useTypedSelector";
import { QueuePerson } from "./queuePerson";
import "./queue.scss";
import { handleDragAndDrop } from "../../../../tool/dragAndDrop";
import { IconButton } from "@material-ui/core";
import { QueueOutlined } from "@material-ui/icons";

export function Queue() {
  const room = useTypedSelector((store) => store.roomInfo);
  const handleChat = (event: any) => {
    document.querySelector(".queue")?.classList.toggle("queue__hidden");
  };
  return (
    <>
      <IconButton className="queue__hide-btn" onClick={handleChat}>
        <QueueOutlined />
      </IconButton>
      <ul className="queue draggable" onMouseDown={handleDragAndDrop}>
        <div className="queue__close"></div>
        {room.queue.map((playerInQ) => (
          <QueuePerson {...playerInQ} />
        ))}
      </ul>
    </>
  );
}
