"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Avatar_1 = require("@material-ui/core/Avatar");
const Tooltip_1 = require("@material-ui/core/Tooltip");
const ChatMessage = (props) => {
    let { message, name, surname, position, src, avatar } = props;
    //!это дело сделать понятным
    if ((src === undefined || src === "") && name !== undefined) {
        avatar = name[0];
        if (surname !== undefined && surname !== "") {
            avatar += surname[0];
        }
    }
    return (<li className="Chat_message">
      <div className="Chat_message__text">{message}</div>
      <Tooltip_1.default title={<div style={{ textAlign: "center" }}>
            {name} {surname}
            <br />
            {position}
          </div>}>
        <Avatar_1.default className="Chat_message__avatar" src={src}>
          {avatar}
        </Avatar_1.default>
      </Tooltip_1.default>
    </li>);
};
exports.default = ChatMessage;
//# sourceMappingURL=ChatMessage.js.map