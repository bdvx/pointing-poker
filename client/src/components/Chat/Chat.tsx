import { Avatar, Toolbar, Tooltip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import "./Chat.scss";

const Chat = () => {
  return (
    <div className="Chat">
      <div className="Chat_messages">
        <div className="Chat_message">
          <div className="Chat_message__text">
            Message long long long long longlonglonglonglonglonglong long long
            long long long long long long long long long long long long long
            long long long long long long long long long long long long long
            long long long long long long long long
          </div>
          <Tooltip title={<div style={{textAlign: 'center'}}>Harry Lewis<br/>Senior Software Engineer</div>}>
            <Avatar className="Chat_message__avatar">H</Avatar>
          </Tooltip>
        </div>
      </div>
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
