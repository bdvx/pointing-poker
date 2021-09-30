import './RegisterPopup.scss';
import { FC, useState } from 'react';
import { Avatar, Button, DialogActions, Input, TextField } from '@material-ui/core';
import IRegisterPopupProps from '../../../types/RegisterPopupProps.type';
import { REGISTER_POPUP_FIELDS, REGISTER_POPUP_FIELDS_DEFAULT_VALUES } from '../../../constants';
import ServerService from '../../../serverService/serverService';
import { RegistrationModel } from '../../../serverService/models/registrationModel';
import { LogInOrSignUpPopup } from '../../Base/LogInOrSignUpPopup/LogInOrSignUpPopup';
import IFieldsValues from '../../../types/LogInOrSignUpPopup.type';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../../store/currentUserSlice';
import { RegisterSuccessPopup } from '../RegisterSuccessPopup/RegisterSuccessPopup';
import { RegisterFailPopup } from '../RegisterFailPopup/RegisterFailPopup';
import { PopUpLinearProgress } from '../../Base/PopUpLinearProgress/PopUpLinearProgress';

export const RegisterPopup: FC<IRegisterPopupProps> = ({ open, onChangeRegisterPopupState }: IRegisterPopupProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string>('');
  const dispatch = useDispatch();

  const [fieldsValues, setFieldsValues] = useState<IFieldsValues>(REGISTER_POPUP_FIELDS_DEFAULT_VALUES);
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
      dispatch(setUserInfo({...fieldsValues, isLogin:true}));
      setLoading(false);
      onChangeRegisterPopupState(false);
      setFieldsValues(REGISTER_POPUP_FIELDS_DEFAULT_VALUES);
      setOpenRegisterSuccessPopup(true);
    } else {
      setLoading(false);
      setOpenRegisterFailPopup(true);
    }
  }

  return (
    <>
      <PopUpLinearProgress className="RegisterPopup" open={ open } onClose={ () => onChangeRegisterPopupState(false) } loading={ loading }>
        <form>
          <h3 className="RegisterPopup__title">Register new user</h3>

          {
            REGISTER_POPUP_FIELDS.map((field) => (
              <div className="RegisterPopup__box" key={field.name}>
                <label>
                  <span className="RegisterPopup__boxTitle">Your { field.title }:</span>
                  <TextField
                    className="RegisterPopup__field"
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

          <div className="RegisterPopup__avatar">
            <span className="RegisterPopup__boxTitle">Image:</span>

            <div className="RegisterPopup__avatarBtns">
              <label className="RegisterPopup__avatarUpload">
                <Input type="file" onChange={ (e) => changeAvatar(e.target) } />
                <Avatar src={ avatar } children={ changeStringAvatar(fieldsValues.firstName) } alt="Avatar" />
              </label>
              <button className="RegisterPopup__avatarReset" onClick={ () => setAvatar('') } type="button">&times;</button>
            </div>
          </div>

          <DialogActions className="RegisterPopup__btns">
            <Button onClick={ () => HandleConfirmRegistration() } disabled={ errors.length > 0 } variant="contained" color="primary" size="large">Confirm</Button>
            <Button onClick={ () => onChangeRegisterPopupState(false) } variant="outlined" color="primary" size="large">Cancel</Button>
          </DialogActions>
        </form>
      </PopUpLinearProgress>

      <RegisterSuccessPopup open={ openRegisterSuccessPopup } onChangeRegisterSuccessPopupState={ (open) => setOpenRegisterSuccessPopup(open) } />
      <RegisterFailPopup open={ openRegisterFailPopup } onChangeRegisterFailPopupState={ (open) => setOpenRegisterFailPopup(open) } />
    </>
  );
};
