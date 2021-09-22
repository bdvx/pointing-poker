"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPopup = void 0;
require("./LogInPopup.scss");
const react_1 = require("react");
const core_1 = require("@material-ui/core");
const LogInOrSignUpPopup_1 = require("../../Base/LogInOrSignUpPopup/LogInOrSignUpPopup");
const constants_1 = require("../../../constants");
const serverService_1 = require("../../../serverService/serverService");
const react_router_1 = require("react-router");
const PopUpLinearProgress_1 = require("../PopUpLinearProgress/PopUpLinearProgress");
const react_redux_1 = require("react-redux");
const currentUserSlice_1 = require("../../../store/currentUserSlice");
const LoginPopup = ({ open, onChangeLogInPopupState }) => {
    const [loading, setLoading] = react_1.useState(false);
    const dispatch = react_redux_1.useDispatch();
    const [fieldsValues, setFieldsValues] = react_1.useState({
        login: '',
        password: ''
    });
    const fieldsProps = { fieldsValues, setFieldsValues };
    const { handleFieldChange } = LogInOrSignUpPopup_1.LogInOrSignUpPopup();
    const router = react_router_1.useHistory();
    const HandleConfirmLogin = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        const response = yield serverService_1.default.signInUser(fieldsValues);
        if (response.isSuccess) {
            setLoading(false);
            alert(response.message);
            console.log(response);
            dispatch(currentUserSlice_1.setUserInfo(Object.assign(Object.assign({}, response.body), { isLogin: true })));
            //история должна пушится после закрытия попапа успешной регистрации
            router.push("/welcomePage");
            onChangeLogInPopupState(false);
        }
        else {
            setLoading(false);
            alert(response.message);
        }
    });
    return (<PopUpLinearProgress_1.PopUpLinearProgress className="LogInPopup" open={open} onClose={() => onChangeLogInPopupState(false)} loading={loading}>
      <form>
        {constants_1.LOGIN_POPUP_FIELDS.map((fieldName) => (<div className="LogInPopup__fieldContainer" key={fieldName}>
              <label>
                <core_1.TextField className="LogInPopup__field" defaultValue={fieldsValues[fieldName]} onChange={(e) => handleFieldChange(Object.assign({ e }, fieldsProps))} name={fieldName} type={fieldName === 'password' ? 'password' : 'text'} label={fieldName} variant="outlined" size="small"/>
              </label>
            </div>))}

        <core_1.DialogActions className="LogInPopup__actions">
          <core_1.Button onClick={HandleConfirmLogin} variant="contained" color="primary" size="large">Confirm</core_1.Button>
          <core_1.Button onClick={() => onChangeLogInPopupState(false)} variant="outlined" color="primary" size="large">Cancel</core_1.Button>
        </core_1.DialogActions>
      </form>
    </PopUpLinearProgress_1.PopUpLinearProgress>);
};
exports.LoginPopup = LoginPopup;
//# sourceMappingURL=LogInPopup.js.map