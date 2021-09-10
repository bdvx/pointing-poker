import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";

interface MyProps {
  message: string;
  name: string;
  surname?: string;
  position: string;
  src?: string;
}

const ChatMessage = (props: MyProps) => {
  const { message, name, surname, position, src } = props;
  let avatar;
  if (src === undefined || src === '') {
    avatar = name[0];
    if (surname !== undefined && surname!=='') {
      avatar += surname[0];
    }
  }
  console.log(avatar);
  return (
    <li className="Chat_message">
      <div className="Chat_message__text">{message}</div>
      <Tooltip
        title={
          <div style={{ textAlign: "center" }}>
            {name} {surname}
            <br />
            {position}
          </div>
        }
      >
        <Avatar className="Chat_message__avatar" src={src}>{avatar}</Avatar>
      </Tooltip>
    </li>
  );
};

export default ChatMessage;
