import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import ChatMessage from "./ChatMessage/ChatMessage";
import "./Chat.scss";
import { useTypedSelector } from "../../hooky/useTypedSelector";
import clientService from "../../clientService/clientService";
import { newMessage } from "../../store/chatSlice";
import { useDispatch } from "react-redux";

const Chat = () => {
  const chatState = useTypedSelector((store) => store.chat);
  const currentUserState = useTypedSelector((store) => store.userInfo);
  const room = useTypedSelector((store) => store.roomInfo);
  const dispatch = useDispatch();

  clientService.setDispatch(dispatch);
  const sendMessage = (event: any) => {
    const input = (event.target as HTMLElement)
      .closest(".Chat")
      ?.querySelector(".Chat_input__text");
    if ((input as HTMLInputElement).value === "") return;
    dispatch(
      newMessage({
        message: (input as HTMLInputElement).value,
        login: currentUserState.login,
      })
    );
    (input as HTMLInputElement).value = "";
  };

  const handleDragAndDrop = (event: any) => {
    console.log(event.target)
    const chat = event.target;

    let shiftX = event.clientX - chat.getBoundingClientRect().left;
    let shiftY = event.clientY - chat.getBoundingClientRect().top;

    moveAt(event.pageX, event.pageY);
    function moveAt(pageX: number, pageY: number) {
      chat.style.left = pageX - shiftX + "px";
      chat.style.top = pageY - shiftY + "px";
    }

    function onMouseMove(event: any) {
      moveAt(event.pageX, event.pageY);
    }
    document.addEventListener("mousemove", onMouseMove);
    chat.onmouseup = function () {
      document.removeEventListener("mousemove", onMouseMove);
      chat.onmouseup = null;
    };

    chat.ondragstart = function () {
      return false;
    };
  };

  return (
    <div className="Chat" onMouseDown={handleDragAndDrop}>
      <ul className="Chat_messages">
        {chatState.map((message) => {
          const user = clientService.getUserByLogin(room, message.login);
          return (
            <ChatMessage
              message={message.message}
              name={user?.firstName}
              surname={user?.lastName}
              src={user?.avatar}
              position={user?.jobPosition}
            />
          );
        })}
      </ul>
      <div className="Chat_input">
        <input placeholder="Type something..." className="Chat_input__text" />
        <IconButton>
          <SendIcon onClick={sendMessage} />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
