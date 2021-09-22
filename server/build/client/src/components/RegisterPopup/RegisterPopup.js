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
const constants_1 = require("../../constants");
const serverService_1 = require("../../serverService/serverService");
const RegisterPopup = ({ classes, open, onChangeRegisterPopupState }) => {
    const [role, setRole] = react_1.useState(true);
    const [avatar, setAvatar] = react_1.useState('');
    const [fieldsValues, setFieldsValues] = react_1.useState({
        login: '',
        password: '',
        firstName: '',
        lastName: '',
        jobPosition: '',
        avatar: ''
    });
    const [errors, setErrors] = react_1.useState([]);
    const checkValidation = (value, fieldName) => {
        let regex = /.+/;
        if (fieldName === 'login') {
            regex = /^[^\s]+$/;
        }
        if (!regex.test(value)) {
            if (!errors.includes(fieldName)) {
                setErrors([...errors, fieldName]);
            }
        }
        else if (errors.includes(fieldName)) {
            const newErrors = errors.filter((error) => error !== fieldName);
            setErrors(newErrors);
        }
    };
    const handleFieldChange = (e) => {
        const { value, name } = e.target;
        setFieldsValues(Object.assign(Object.assign({}, fieldsValues), { [name]: value }));
        checkValidation(value, name);
    };
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
    const addFieldErrorMessage = ({ name, title, errorMessage }) => {
        if (!errors.includes(name))
            return '';
        return errorMessage ? errorMessage : `${title} can't be empty.`;
    };
    return (<core_1.Dialog className={`register-popup ${classes}`} open={open} onClose={() => onChangeRegisterPopupState(false)}>
      <form className="register-popup__form">
        <div className="register-popup__header">
          <h3 className="register-popup__title">Register new user</h3>
        {/*           <label className="register-popup__role-block">
                    <span className="register-popup__role-title">Connect as<br/>Observer</span>
                    <Switch
                      className="register-popup__role"
                      checked={role}
                      onChange={() => setRole(!role)}
                      color="primary"
                    />
                  </label> */}
        </div>

        {constants_1.REGISTER_POPUP_FIELDS.map((field) => (<div className="register-popup__field-block" key={field.name}>
              <label>
                <span className="register-popup__field-title">Your {field.title}:</span>
                <core_1.TextField className="register-popup__field" defaultValue={fieldsValues[field.name]} onChange={(e) => handleFieldChange(e)} name={field.name} error={errors.includes(field.name)} helperText={addFieldErrorMessage(field)} type={field.type ? field.type : 'text'} variant="outlined" size="small"/>
              </label>
            </div>))}

        <div className="register-popup__avatar-block">
          <span className="register-popup__field-title">Image:</span>

          <div className="register-popup__avatar-btns">
            <label className="register-popup__avatar-btn-wrap" htmlFor="register-popup__avatar-file">
              <core_1.Input id="register-popup__avatar-file" type="file" onChange={(e) => changeAvatar(e.target)}/>
              <core_1.Button className="register-popup__avatar-btn" variant="contained" size="large" component="span">
                Choose file
              </core_1.Button>
            </label>
            <core_1.Button className="register-popup__avatar-block-btn" variant="contained" color="primary" size="large" onClick={() => setAvatar('')}>
              Reset 
            </core_1.Button>
          </div>

          <core_1.Avatar className="register-popup__avatar" alt="Avatar" src={avatar} children={changeStringAvatar(fieldsValues.firstName)}/>
        </div>
        <core_1.DialogActions className="register-popup__btns">
          <core_1.Button variant="contained" color="primary" size="large" disabled={errors.length > 0} onClick={() => handleConfirmRegistration(onChangeRegisterPopupState, fieldsValues)}>
            Confirm
          </core_1.Button>
          <core_1.Button variant="outlined" color="primary" size="large" onClick={() => onChangeRegisterPopupState(false)}>
            Cancel
          </core_1.Button>
        </core_1.DialogActions>
      </form>
    </core_1.Dialog>);
};
exports.RegisterPopup = RegisterPopup;
function handleConfirmRegistration(cb, fieldsValues) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(1);
        const response = yield serverService_1.default.registerNewUser(fieldsValues);
        //TODO прикрутить лоадер
        alert(response);
        cb(false);
    });
}
//# sourceMappingURL=RegisterPopup.js.map