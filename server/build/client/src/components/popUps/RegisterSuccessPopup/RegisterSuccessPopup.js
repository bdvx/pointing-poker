"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterSuccessPopup = void 0;
const core_1 = require("@material-ui/core");
require("./RegisterSuccessPopup.scss");
const RegisterSuccessPopup = (props) => {
    const { open, onChangeRegisterSuccessPopupState } = props;
    return (<core_1.Dialog className="RegisterSuccessPopup" open={open} onClose={() => onChangeRegisterSuccessPopupState(false)}>
      <core_1.DialogTitle>Success registration</core_1.DialogTitle>
      
      <core_1.DialogContent>
        <core_1.DialogContentText>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</core_1.DialogContentText>

        <core_1.DialogContentText>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</core_1.DialogContentText>

        <core_1.DialogContentText>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</core_1.DialogContentText>
      </core_1.DialogContent>

      <core_1.Divider />

      <core_1.DialogActions>
        <core_1.Button autoFocus onClick={() => onChangeRegisterSuccessPopupState(false)}>OK</core_1.Button>
      </core_1.DialogActions>
    </core_1.Dialog>);
};
exports.RegisterSuccessPopup = RegisterSuccessPopup;
//# sourceMappingURL=RegisterSuccessPopup.js.map