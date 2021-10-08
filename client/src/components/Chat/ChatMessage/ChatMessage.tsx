import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import clientService from "../../../clientService/clientService";
import { useTypedSelector } from "../../../hooky/useTypedSelector";
import { ChatMessageInfo } from "../../../serverService/models/chatMessageInfoModel";
import { UserInfo } from "../../../serverService/models/userInfoModel";

interface ChatMessageInfoExt {
  messageInfo: ChatMessageInfo;
}

const ChatMessage = (props: ChatMessageInfoExt) => {
  const room = useTypedSelector((store) => store.roomInfo);
  const user = clientService.getUserByLogin(
    room,
    (props.messageInfo as ChatMessageInfo).login
  );

  const { firstName, lastName, avatar:src, jobPosition} = user as UserInfo;

  let avatar;
  //!это дело сделать понятным
  if ((src === undefined || src === "") && firstName !== undefined) {
    avatar = firstName[0];
    if (lastName !== undefined && lastName !== "") {
      avatar += lastName[0];
    }
  }

  console.log(props);

  return (
    <li className="Chat_message">
      <div className="Chat_message__text">{props.messageInfo.message}</div>
      <Tooltip
        title={
          <div style={{ textAlign: "center" }}>
            {firstName} {lastName}
            <br/>
            {jobPosition}
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
