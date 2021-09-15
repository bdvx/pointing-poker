import './RegisterPopup.scss';
import { FC, useState } from 'react';
import { Avatar, Button, Dialog, DialogActions, Input, Switch, TextField } from '@material-ui/core';
import IRegisterPopupProps from '../../types/RegisterPopupProps.type';
import { REGISTER_POPUP_FIELDS } from '../../constants';
import { LogInOrSignUpPopup } from '../Base/LogInOrSignUpPopup/LogInOrSignUpPopup';
import IFieldsValues from '../../types/LogInOrSignUpPopup.type';

export const RegisterPopup: FC<IRegisterPopupProps> = ({classes, open, onChangeRegisterPopupState}: IRegisterPopupProps) => {
  const [role, setRole] = useState<boolean>(true);
  const [avatar, setAvatar] = useState<string>('');

  const [fieldsValues, setFieldsValues] = useState<IFieldsValues>({
    login: '',
    password: '',
    firstName: '',
    lastName: '',
    jobPosition: ''
  });
  const [errors, setErrors] = useState<string[]>([]);

  const fieldsProps = { fieldsValues, setFieldsValues, errors, setErrors };
  const { handleFieldChange, addFieldErrorMessage } = LogInOrSignUpPopup();

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
        }
      }
      
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog className={`register-popup ${ classes }`} open={open} onClose={() => onChangeRegisterPopupState(false)}>
      <form className="register-popup__form">
        <div className="register-popup__header">
          <h3 className="register-popup__title">Connect to lobby</h3>
          <label className="register-popup__role-block">
            <span className="register-popup__role-title">Connect as<br/>Observer</span>
            <Switch
              className="register-popup__role"
              checked={role}
              onChange={() => setRole(!role)}
              color="primary"
            />
          </label>
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
            onClick={() => onChangeRegisterPopupState(false)}
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
    </Dialog>
  );
};