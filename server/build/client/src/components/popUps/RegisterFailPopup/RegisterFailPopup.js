"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterFailPopup = void 0;
const core_1 = require("@material-ui/core");
require("./RegisterFailPopup.scss");
const material_1 = require("@mui/material");
const RegisterFailPopup = (props) => {
    const { open, onChangeRegisterFailPopupState } = props;
    return (<core_1.Dialog className="RegisterFailPopup" open={open} onClose={() => onChangeRegisterFailPopupState(false)}>
      <material_1.Alert onClose={() => onChangeRegisterFailPopupState(false)} variant="outlined" severity="error">
        <material_1.AlertTitle>Fail registration</material_1.AlertTitle>
        This is an error alert — check it out!
      </material_1.Alert>
    </core_1.Dialog>);
};
exports.RegisterFailPopup = RegisterFailPopup;
//# sourceMappingURL=RegisterFailPopup.js.map