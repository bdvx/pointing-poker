"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomePage = void 0;
require("./WelcomePage.scss");
const react_1 = require("react");
const core_1 = require("@material-ui/core");
const LargeLogo_1 = require("../LargeLogo/LargeLogo");
const RegisterPopup_1 = require("../RegisterPopup/RegisterPopup");
const WelcomePage = ({ classes }) => {
    const [registerPopupOpen, setRegisterPopupOpen] = react_1.useState(false);
    return (<div className={`welcome-page ${classes}`}>
      <LargeLogo_1.LargeLogo />

      <span className="welcome-page__subtitle">Start your planning:</span>

      <core_1.Grid className="welcome-page__control-block" container justifyContent="space-between" alignItems="center">
        <span className="welcome-page__control-block-text">Create session:</span>
        <core_1.Button className="welcome-page__control-block-btn" variant="contained" color="primary" size="large" onClick={() => setRegisterPopupOpen(true)}>
          Start new game
        </core_1.Button>
      </core_1.Grid>

      <span className="welcome-page__subtitle welcome-page__subtitle_margin_left">OR:</span>

      <div className="welcome-page__control-block">
        <span className="welcome-page__control-block-text welcome-page__control-block-text_block">
          Connect to lobby by 
          <strong className="welcome-page__control-block-subtext">URL</strong>
          :
        </span>

        <core_1.Grid container justifyContent="space-between" alignItems="center">
          <core_1.TextField className="welcome-page__control-block-field" variant="outlined" size="small"/>
          <core_1.Button className="welcome-page__control-block-btn" variant="contained" color="primary" size="large">
            Connect
          </core_1.Button>
        </core_1.Grid>
      </div>

      <RegisterPopup_1.RegisterPopup classes="app__register-popup" open={registerPopupOpen} onChangeRegisterPopupState={(open) => setRegisterPopupOpen(open)}/>
    </div>);
};
exports.WelcomePage = WelcomePage;
//# sourceMappingURL=WelcomePage.js.map