import { useTypedSelector } from "../../hooky/useTypedSelector";
import { ChatMessageInfo } from "../../serverService/models/chatMessageInfoModel";
import { handleDragAndDrop } from "../../tool/dragAndDrop";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import ChatMessage from "./ChatMessage/ChatMessage";
import clientService from "../../clientService/clientService";
import ServerService from "../../serverService/serverService";
import "./Chat.scss";

const Chat = () => {
  const chat = useTypedSelector((store) => store.chat);
  const currentUser = useTypedSelector((store) => store.userInfo);
  const room = useTypedSelector((store) => store.roomInfo);

  const sendMessage = (event: any) => {
    //!Вот эту страашилку желательно переписать
    const targetInput = (event.target as HTMLElement).closest(".Chat")
                        ?.querySelector(".Chat_input__text") as HTMLInputElement;

    const message = targetInput.value;
    if (message) {
      const messageInfo = makeNewMessage(currentUser.login, message);
      ServerService.sendChatMessage(messageInfo);
    } else {
      return;
    }

    targetInput.value = "";
  };


  return (
    <div className="Chat" onMouseDown={handleDragAndDrop}>

      <ul className="Chat_messages">
        {chat.map((messageInfo) => {
          const user = clientService.getUserByLogin(room, messageInfo.login);
          return (<ChatMessage {...user} message = {messageInfo.message}/>);
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


function makeNewMessage(login:string, message:string) {
  const messageInfo:ChatMessageInfo = {
    login,
    message
  }
  return messageInfo;
}