"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const useTypedSelector_1 = require("../../hooky/useTypedSelector");
const dragAndDrop_1 = require("../../tool/dragAndDrop");
const IconButton_1 = require("@material-ui/core/IconButton");
const Send_1 = require("@material-ui/icons/Send");
const ChatMessage_1 = require("./ChatMessage/ChatMessage");
const clientService_1 = require("../../clientService/clientService");
const serverService_1 = require("../../serverService/serverService");
require("./Chat.scss");
const Chat = () => {
    const chat = useTypedSelector_1.useTypedSelector((store) => store.chat);
    const currentUser = useTypedSelector_1.useTypedSelector((store) => store.userInfo);
    const room = useTypedSelector_1.useTypedSelector((store) => store.roomInfo);
    const sendMessage = (event) => {
        var _a;
        //!Вот эту страашилку желательно переписать
        const targetInput = (_a = event.target.closest(".Chat")) === null || _a === void 0 ? void 0 : _a.querySelector(".Chat_input__text");
        const message = targetInput.value;
        if (message) {
            const messageInfo = makeNewMessage(currentUser.login, message);
            serverService_1.default.sendChatMessage(messageInfo);
        }
        else {
            return;
        }
        targetInput.value = "";
    };
    return (<div className="Chat" onMouseDown={dragAndDrop_1.handleDragAndDrop}>

      <ul className="Chat_messages">
        {chat.map((messageInfo) => {
            const user = clientService_1.default.getUserByLogin(room, messageInfo.login);
            return (<ChatMessage_1.default {...user} message={messageInfo.message}/>);
        })}
      </ul>

      <div className="Chat_input">
        <input placeholder="Type something..." className="Chat_input__text"/>
        <IconButton_1.default>
          <Send_1.default onClick={sendMessage}/>
        </IconButton_1.default>
      </div>

    </div>);
};
exports.default = Chat;
function makeNewMessage(login, message) {
    const messageInfo = {
        login,
        message
    };
    return messageInfo;
}
//# sourceMappingURL=Chat.js.map