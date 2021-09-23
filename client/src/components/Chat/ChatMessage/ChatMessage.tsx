import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";

interface ChatMessageInfoExt {
  message: string,
  name?: string,
  surname?: string,
  position?: string,
  src?: string,
  avatar?: string
}

const ChatMessage = (props: ChatMessageInfoExt) => {
  let { message, name, surname, position, src, avatar } = props;

  //!это дело сделать понятным
  if ((src === undefined || src === "") && name !== undefined) {
    avatar = name[0];
    if (surname !== undefined && surname !== "") {
      avatar += surname[0];
    }
  }

  return (
    <li className="Chat_message">
      <div className="Chat_message__text">{message}</div>
      <Tooltip
        title = {
          <div style={{ textAlign: "center" }}>
            {name} {surname}
            <br />
            {position}
          </div>
        }
      >
        <Avatar className="Chat_message__avatar" src={src}>
          {avatar}
        </Avatar>
      </Tooltip>
    </li>
  );
};

export default ChatMessage;
