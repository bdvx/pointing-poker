import './RegisterPopup.scss';
import { ChangeEvent, FC, useState } from 'react';
import { Avatar, Button, Dialog, DialogActions, Input, Switch, TextField } from '@material-ui/core';
import IRegisterPopupProps from '../../types/RegisterPopupProps.type';
import IRegisterPopupFieldsValues from '../../types/RegisterPopupFieldsValues.type';

export const RegisterPopup: FC<IRegisterPopupProps> = ({classes, open, onChangeRegisterPopupState}: IRegisterPopupProps) => {
  const [role, setRole] = useState<boolean>(true);
  const [avatar, setAvatar] = useState<string>('');

  const [fieldsValues, setFieldsValues] = useState<IRegisterPopupFieldsValues>({
    login: '',
    password: '',
    firstName: '',
    lastName: '',
    jobPosition: ''
  });
  const [errors, setErrors] = useState<string[]>([]);

  const checkValidation = (value: string, fieldName: string): void => {
    let regex = /.+/;

    if (fieldName === 'login') {
      regex = /^[^\s]+$/;
    }

    if (!regex.test(value)) {
      if (!errors.includes(fieldName)) {
        setErrors([...errors, fieldName]);
      }
    } else if (errors.includes(fieldName)) {
      const newErrors = errors.filter((error) => error !== fieldName);
      setErrors(newErrors);
    }
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { value, name } = e.target;

    setFieldsValues({
      ...fieldsValues,
      [name]: value
    });

    checkValidation(value, name);
  };

  const changeStringAvatar = (name: string): string | null => {
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

        <div className="register-popup__field-block">
          <label>
            <span className="register-popup__field-title">Your login:</span>
            <TextField
              className="register-popup__field"
              variant="outlined"
              size="small"
              name="login"
              defaultValue={fieldsValues.login}
              error={errors.includes('login')}
              helperText={errors.includes('login') ? 'Login can\'t be empty and contain spaces.' : ''}
              onChange={(e) => { handleFieldChange(e) }}
            />
          </label>
        </div>

        <div className="register-popup__field-block">
          <label>
            <span className="register-popup__field-title">Your password:</span>
            <TextField
              className="register-popup__field"
              type="password"
              variant="outlined"
              size="small"
              name="password"
              defaultValue={fieldsValues.password}
              error={errors.includes('password')}
              helperText={errors.includes('password') ? 'Password can\'t be empty.' : ''}
              onChange={(e) => { handleFieldChange(e) }}
            />
          </label>
        </div>

        <div className="register-popup__field-block">
          <label>
            <span className="register-popup__field-title">Your first name:</span>
            <TextField
              className="register-popup__field"
              variant="outlined"
              size="small"
              name="firstName"
              defaultValue={fieldsValues.firstName}
              error={errors.includes('firstName')}
              helperText={errors.includes('firstName') ? 'First name can\'t be empty.' : ''}
              onChange={(e) => { handleFieldChange(e) }}
            />
          </label>
        </div>

        <div className="register-popup__field-block">
          <label>
            <span className="register-popup__field-title">Your last name:</span>
            <TextField
              className="register-popup__field"
              variant="outlined"
              size="small"
              name="lastName"
              defaultValue={fieldsValues.lastName}
              error={errors.includes('lastName')}
              helperText={errors.includes('lastName') ? 'Last name can\'t be empty.' : ''}
              onChange={(e) => handleFieldChange(e)}
            />
          </label>
        </div>

        <div className="register-popup__field-block">
          <label>
            <span className="register-popup__field-title">Your job position:</span>
            <TextField
              className="register-popup__field"
              variant="outlined"
              size="small"
              name="jobPosition"
              defaultValue={fieldsValues.jobPosition}
              error={errors.includes('jobPosition')}
              helperText={errors.includes('jobPosition') ? 'Job position can\'t be empty.' : ''}
              onChange={(e) => handleFieldChange(e)}
            />
          </label>
        </div>

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