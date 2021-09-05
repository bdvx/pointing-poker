import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import ChatMessage from "../ChatMessage/ChatMessage";
import "./Chat.scss";

const Chat = () => {
  return (
    <div className="Chat">
      <ul className="Chat_messages">
        <ChatMessage message='Random message' name='Harry' surname='' src='./logo192.png' position='Middle Software Engineer'/>
      </ul>
      <div className="Chat_input">
        <input placeholder="Type something..." className="Chat_input__text" />
        <IconButton>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
