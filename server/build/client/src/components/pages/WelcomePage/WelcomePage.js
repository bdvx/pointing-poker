"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomePage = void 0;
require("./WelcomePage.scss");
const react_1 = require("react");
const core_1 = require("@material-ui/core");
const LargeLogo_1 = require("../../LargeLogo/LargeLogo");
const serverService_1 = require("../../../serverService/serverService");
const useTypedSelector_1 = require("../../../hooky/useTypedSelector");
const react_router_1 = require("react-router");
const currentUserSlice_1 = require("../../../store/currentUserSlice");
const react_redux_1 = require("react-redux");
const WelcomePage = ({ classes }) => {
    const currentUserInfo = useTypedSelector_1.useTypedSelector(store => store.userInfo);
    const currentRoom = useTypedSelector_1.useTypedSelector(store => store.roomInfo);
    const [url, setUrl] = react_1.useState('');
    const router = react_router_1.useHistory();
    const dispatch = react_redux_1.useDispatch();
    serverService_1.default.setDispatch(dispatch);
    const onStartBtnClick = () => {
        currentUserSlice_1.setScrumStatus(true);
        const userInfoCopy = makeUserInfoCopy(currentUserInfo, true);
        serverService_1.default.makeNewRoom(userInfoCopy);
        router.push("/lobbyStart");
    };
    const onConnectToLobbyBtnClick = () => {
        currentUserSlice_1.setScrumStatus(false);
        const userInfoCopy = makeUserInfoCopy(currentUserInfo, false);
        //TODO при введении url разу добавлять в стейт
        const roomId = defineIdfromUrl(url);
        serverService_1.default.connectToRoom(userInfoCopy, roomId);
        //TODO коннект уже в саму игру (нужно в Room хранить поле isInGame)
        router.push("/lobbyStart");
    };
    return (<div className={`welcome-page ${classes}`}>
      <LargeLogo_1.LargeLogo />

      <span className="welcome-page__subtitle">Start your planning:</span>

      <core_1.Grid className="welcome-page__control-block" container justifyContent="space-between" alignItems="center">
        <span className="welcome-page__control-block-text">Create session:</span>
        <core_1.Button className="welcome-page__control-block-btn" variant="contained" color="primary" size="large" onClick={onStartBtnClick}>
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
          <core_1.TextField className="welcome-page__control-block-field" variant="outlined" size="small" value={url} onChange={(e) => setUrl(e.target.value)}/>
          <core_1.Button className="welcome-page__control-block-btn" variant="contained" color="primary" size="large" onClick={onConnectToLobbyBtnClick}>
            Connect
          </core_1.Button>
        </core_1.Grid>
      </div>

    </div>);
};
exports.WelcomePage = WelcomePage;
function makeUserInfoCopy(currentUserInfo, isScrum) {
    const userInfoCopy = Object.assign(Object.assign({}, currentUserInfo), { isScrum: isScrum });
    return userInfoCopy;
}
function defineIdfromUrl(urlStr) {
    const urlArr = urlStr.split('/');
    return urlArr[urlArr.length - 1];
}
//# sourceMappingURL=WelcomePage.js.map