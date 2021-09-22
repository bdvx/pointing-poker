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
exports.RegisterPopup = void 0;
require("./RegisterPopup.scss");
const react_1 = require("react");
const core_1 = require("@material-ui/core");
const constants_1 = require("../../../constants");
const serverService_1 = require("../../../serverService/serverService");
const react_router_1 = require("react-router");
const LogInOrSignUpPopup_1 = require("../../Base/LogInOrSignUpPopup/LogInOrSignUpPopup");
const react_redux_1 = require("react-redux");
const currentUserSlice_1 = require("../../../store/currentUserSlice");
const RegisterSuccessPopup_1 = require("../RegisterSuccessPopup/RegisterSuccessPopup");
const RegisterFailPopup_1 = require("../RegisterFailPopup/RegisterFailPopup");
const PopUpLinearProgress_1 = require("../PopUpLinearProgress/PopUpLinearProgress");
const RegisterPopup = ({ open, onChangeRegisterPopupState }) => {
    const [loading, setLoading] = react_1.useState(false);
    const [avatar, setAvatar] = react_1.useState('');
    const router = react_router_1.useHistory();
    const dispatch = react_redux_1.useDispatch();
    const [fieldsValues, setFieldsValues] = react_1.useState(constants_1.REGISTER_POPUP_FIELDS_DEFAULT_VALUES);
    const [errors, setErrors] = react_1.useState([]);
    const fieldsProps = { fieldsValues, setFieldsValues, errors, setErrors };
    const { handleFieldChange, addFieldErrorMessage } = LogInOrSignUpPopup_1.LogInOrSignUpPopup();
    const [openRegisterSuccessPopup, setOpenRegisterSuccessPopup] = react_1.useState(false);
    const [openRegisterFailPopup, setOpenRegisterFailPopup] = react_1.useState(false);
    const changeStringAvatar = (name) => {
        if (!name)
            return null;
        return (name.length) > 1 ? `${name[0]}${name[name.length - 1]}` : `${name[0]}`;
    };
    const changeAvatar = (target) => {
        const file = target.files[0];
        if (file) {
            target.value = '';
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    setAvatar(reader.result.toString());
                    setFieldsValues(Object.assign(Object.assign({}, fieldsValues), { avatar: reader.result.toString() }));
                }
            };
            reader.readAsDataURL(file);
        }
    };
    const HandleConfirmRegistration = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        const response = yield serverService_1.default.registerNewUser(fieldsValues);
        if (response.isSuccess) {
            //попап
            //alert - временная замена попАпу
            //история должна пушится после закрытия попапа успешной регистрации
            dispatch(currentUserSlice_1.setUserInfo(Object.assign(Object.assign({}, fieldsValues), { isLogin: true })));
            setFieldsValues(constants_1.REGISTER_POPUP_FIELDS_DEFAULT_VALUES);
            router.push('/welcomePage');
            alert(response.message);
            setLoading(false);
            onChangeRegisterPopupState(false);
            setOpenRegisterSuccessPopup(true);
        }
        else {
            //ошибка создания
            //response.message хранит информацию ошибки
            alert(response.message);
            setLoading(false);
            setOpenRegisterFailPopup(true);
        }
    });
    return (<>
      <PopUpLinearProgress_1.PopUpLinearProgress className="RegisterPopup" open={open} onClose={() => onChangeRegisterPopupState(false)} loading={loading}>
        <form>
          <h3 className="RegisterPopup__title">Register new user</h3>

          {constants_1.REGISTER_POPUP_FIELDS.map((field) => (<div className="RegisterPopup__box" key={field.name}>
                <label>
                  <span className="RegisterPopup__boxTitle">Your {field.title}:</span>
                  <core_1.TextField className="RegisterPopup__field" defaultValue={fieldsValues[field.name]} onChange={(e) => handleFieldChange(Object.assign({ e }, fieldsProps))} name={field.name} error={errors.includes(field.name)} helperText={addFieldErrorMessage(field, errors)} type={field.type ? field.type : 'text'} variant="outlined" size="small"/>
                </label>
              </div>))}

          <div className="RegisterPopup__avatar">
            <span className="RegisterPopup__boxTitle">Image:</span>

            <div className="RegisterPopup__avatarBtns">
              <label className="RegisterPopup__avatarUpload">
                <core_1.Input type="file" onChange={(e) => changeAvatar(e.target)}/>
                <core_1.Avatar src={avatar} children={changeStringAvatar(fieldsValues.firstName)} alt="Avatar"/>
              </label>
              <button className="RegisterPopup__avatarReset" onClick={() => setAvatar('')} type="button">&times;</button>
            </div>
          </div>

          <core_1.DialogActions className="RegisterPopup__btns">
            <core_1.Button onClick={() => HandleConfirmRegistration()} disabled={errors.length > 0} variant="contained" color="primary" size="large">Confirm</core_1.Button>
            <core_1.Button onClick={() => onChangeRegisterPopupState(false)} variant="outlined" color="primary" size="large">Cancel</core_1.Button>
          </core_1.DialogActions>
        </form>
      </PopUpLinearProgress_1.PopUpLinearProgress>

      <RegisterSuccessPopup_1.RegisterSuccessPopup open={openRegisterSuccessPopup} onChangeRegisterSuccessPopupState={(open) => setOpenRegisterSuccessPopup(open)}/>
      <RegisterFailPopup_1.RegisterFailPopup open={openRegisterFailPopup} onChangeRegisterFailPopupState={(open) => setOpenRegisterFailPopup(open)}/>
    </>);
};
exports.RegisterPopup = RegisterPopup;
//# sourceMappingURL=RegisterPopup.js.map