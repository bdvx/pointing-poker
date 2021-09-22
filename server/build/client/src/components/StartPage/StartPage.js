"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartPage = void 0;
require("./StartPage.scss");
const react_1 = require("react");
const core_1 = require("@material-ui/core");
const LargeLogo_1 = require("../LargeLogo/LargeLogo");
const RegisterPopup_1 = require("../RegisterPopup/RegisterPopup");
const StartPage = ({ classes }) => {
    const [registerPopupOpen, setRegisterPopupOpen] = react_1.useState(false);
    return (<div className={`startPage ${classes}`}>
      <LargeLogo_1.LargeLogo />

      <core_1.Button onClick={() => setRegisterPopupOpen(true)} variant="contained" color="primary" size="large">Sign up</core_1.Button>
      <core_1.Button variant="contained" color="primary" size="large">Log in</core_1.Button>

      <RegisterPopup_1.RegisterPopup classes="" open={registerPopupOpen} onChangeRegisterPopupState={(open) => setRegisterPopupOpen(open)}/>
    </div>);
};
exports.StartPage = StartPage;
//# sourceMappingURL=StartPage.js.map