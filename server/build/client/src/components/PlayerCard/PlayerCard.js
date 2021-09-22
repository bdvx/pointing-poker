"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const Block_1 = require("@material-ui/icons/Block");
require("./PlayerCard.scss");
const PlayerCard = (props) => {
    const { image, name, surname, position } = props;
    let avatar;
    if (image === undefined || image === "") {
        avatar = name[0];
        if (surname !== undefined && surname !== "") {
            avatar += surname[0];
        }
    }
    return (<div className="PlayerCard">
      <core_1.Avatar className="PlayerCard_avatar" src={image}>
        {avatar}
      </core_1.Avatar>
      <div className="PlayerCard_info">
        <div className="PlayerCard_info__name">
          {name} {surname}
        </div>
        <div className="PlayerCard_info__position">{position}</div>
      </div>
      <core_1.IconButton>
        <Block_1.default />
      </core_1.IconButton>
    </div>);
};
exports.default = PlayerCard;
//# sourceMappingURL=PlayerCard.js.map