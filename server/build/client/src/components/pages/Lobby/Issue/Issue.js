"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const Edit_1 = require("@material-ui/icons/Edit");
const Delete_1 = require("@material-ui/icons/Delete");
require("./Issue.scss");
const Issue = (props) => {
    const { title, priority, link } = props;
    return (<a className="Issue" href={link}>
      <div className="Issue__info">
        <div className="Issue__info_title">{title}</div>
        <div className="Issue__info_priority">{priority}</div>
      </div>
      <core_1.IconButton>
        <Edit_1.default />
      </core_1.IconButton>
      <core_1.IconButton>
        <Delete_1.default />
      </core_1.IconButton>
    </a>);
};
exports.default = Issue;
//# sourceMappingURL=Issue.js.map