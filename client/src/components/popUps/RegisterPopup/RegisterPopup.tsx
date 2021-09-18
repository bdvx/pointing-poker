import './RegisterPopup.scss';
import { FC, useState } from 'react';
import { Avatar, Button, DialogActions, Input, TextField } from '@material-ui/core';
import IRegisterPopupProps from '../../../types/RegisterPopupProps.type';
import { REGISTER_POPUP_FIELDS } from '../../../constants';
import ServerService from '../../../serverService/serverService';
import { RegistrationModel } from '../../../serverService/models/registrationModel';
import { HttpResponseModel } from '../../../serverService/models/httpResponseModel';
import { useHistory } from 'react-router';
import { LogInOrSignUpPopup } from '../../Base/LogInOrSignUpPopup/LogInOrSignUpPopup';
import IFieldsValues from '../../../types/LogInOrSignUpPopup.type';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../../store/currentUserSlice';
import { RegisterSuccessPopup } from '../RegisterSuccessPopup/RegisterSuccessPopup';
import { RegisterFailPopup } from '../RegisterFailPopup/RegisterFailPopup';
import { PopUpLinearProgress } from '../PopUpLinearProgress/PopUpLinearProgress';

export const RegisterPopup: FC<IRegisterPopupProps> = ({classes, open, onChangeRegisterPopupState}: IRegisterPopupProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [role, setRole] = useState<boolean>(true);
  const [avatar, setAvatar] = useState<string>('');
  const router = useHistory();
  const dispatch = useDispatch();

  const [fieldsValues, setFieldsValues] = useState<IFieldsValues>({
    login: '',
    password: '',
    firstName: '',
    lastName: '',
    jobPosition: '',
    avatar: ''
  });
  const [errors, setErrors] = useState<string[]>([]);

  const fieldsProps = { fieldsValues, setFieldsValues, errors, setErrors };
  const { handleFieldChange, addFieldErrorMessage } = LogInOrSignUpPopup();

  const [openRegisterSuccessPopup, setOpenRegisterSuccessPopup] = useState(false);
  const [openRegisterFailPopup, setOpenRegisterFailPopup] = useState(false);

  const changeStringAvatar = (name: string | undefined): string | null => {
    if (!name) return null;

    return (name.length) > 1 ? `${name[0]}${name[name.length - 1]}` : `${name[0]}`;
  };

  const changeAvatar = (target: HTMLInputElement | HTMLTextAreaElement): void => {
    const file = (target as { files: FileList }).files[0];

    if (file) {
      target.value = '';
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          setAvatar(reader.result.toString());
          setFieldsValues({...fieldsValues, avatar:reader.result.toString()});
        }
      }
      
      reader.readAsDataURL(file);
    }
  };

  const HandleConfirmRegistration = async () => {
    setLoading(true);

    const response = await ServerService.registerNewUser(fieldsValues as RegistrationModel);

    if(response.isSuccess) {
      //попап
      //alert - временная замена попАпу
      //история должна пушится после закрытия попапа успешной регистрации
      dispatch(setUserInfo(fieldsValues));
      //!сброс полей только после диспатча
      router.push('/welcomePage');
      alert(response.message);

      setLoading(false);
      onChangeRegisterPopupState(false);

      setOpenRegisterSuccessPopup(true);
    } else {
      //ошибка создания
      //response.message хранит информацию ошибки
      alert(response.message);

      setLoading(false);
      setOpenRegisterFailPopup(true);
    }
  
  }

  return (
    <>
      <PopUpLinearProgress className={`register-popup ${ classes }`} open={open} onClose={() => onChangeRegisterPopupState(false)} loading={ loading }>
        <form className="register-popup__form">
          <div className="register-popup__header">
            <h3 className="register-popup__title">Register new user</h3>
            {/* <label className="register-popup__role-block">
              <span className="register-popup__role-title">Connect as<br/>Observer</span>
              <Switch
                className="register-popup__role"
                checked={role}
                onChange={() => setRole(!role)}
                color="primary"
              />
            </label> */}
          </div>

          {
            REGISTER_POPUP_FIELDS.map((field) => (
              <div className="register-popup__field-block" key={field.name}>
                <label>
                  <span className="register-popup__field-title">Your { field.title }:</span>
                  <TextField
                    className="register-popup__field"
                    defaultValue={ fieldsValues[field.name as keyof IFieldsValues] }
                    onChange={ (e) => handleFieldChange({ e, ...fieldsProps }) }
                    name={ field.name }
                    error={ errors.includes(field.name) }
                    helperText={ addFieldErrorMessage(field, errors) }
                    type={ field.type ? field.type : 'text' }
                    variant="outlined"
                    size="small"
                  />
                </label>
              </div>
            ))
          }

          <div className="register-popup__avatar-block">
            <span className="register-popup__field-title">Image:</span>

            <div className="register-popup__avatar-btns">
              <label
                className="register-popup__avatar-btn-wrap"
                htmlFor="register-popup__avatar-file"
              >
                <Input
                  id="register-popup__avatar-file"
                  type="file"
                  onChange={(e) => changeAvatar(e.target)}
                />
                <Button
                  className="register-popup__avatar-btn"
                  variant="contained"
                  size="large"
                  component="span"
                >
                  Choose file
                </Button>
              </label>
              <Button
                className="register-popup__avatar-block-btn"
                variant="contained"
                color="primary"
                size="large"
                onClick={() => setAvatar('')}
              >
                Reset 
              </Button>
            </div>

            <Avatar
              className="register-popup__avatar"
              alt="Avatar"
              src={ avatar }
              children={changeStringAvatar(fieldsValues.firstName)}
            />
          </div>
          <DialogActions className="register-popup__btns">
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={errors.length > 0}
              onClick={() => HandleConfirmRegistration()}
            >
              Confirm
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => onChangeRegisterPopupState(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </PopUpLinearProgress>

      <RegisterSuccessPopup open={ openRegisterSuccessPopup } onChangeRegisterSuccessPopupState={ (open) => setOpenRegisterSuccessPopup(open) } />
      <RegisterFailPopup open={ openRegisterFailPopup } onChangeRegisterFailPopupState={ (open) => setOpenRegisterFailPopup(open) } />
    </>
  );
};
