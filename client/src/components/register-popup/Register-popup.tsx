import './Register-popup.scss';
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react';
import { Avatar, Button, Dialog, DialogActions, Input, Switch, TextField } from '@material-ui/core';
import IRegisterPopupProps from '../../types/register-popup-props.type';

export const RegisterPopup: FC<IRegisterPopupProps> = ({classes, open, onChangeRegisterPopupState}: IRegisterPopupProps) => {
  const [role, setRole] = useState<boolean>(true);
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [jobPosition, setJobPosition] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);

  const [avatar, setAvatar] = useState<string>('');

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

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setFieldValue: Dispatch<SetStateAction<string>>): void => {
    const { value, name } = e.target;

    setFieldValue(value);
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
              defaultValue={login}
              error={errors.includes('login')}
              helperText={errors.includes('login') ? 'Login can\'t be empty and contain spaces.' : ''}
              onChange={(e) => { handleFieldChange(e, setLogin) }}
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
              defaultValue={password}
              error={errors.includes('password')}
              helperText={errors.includes('password') ? 'Password can\'t be empty.' : ''}
              onChange={(e) => { handleFieldChange(e, setPassword) }}
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
              name="first name"
              defaultValue={firstName}
              error={errors.includes('first name')}
              helperText={errors.includes('first name') ? 'First name can\'t be empty.' : ''}
              onChange={(e) => { handleFieldChange(e, setFirstName) }}
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
              name="last name"
              defaultValue={lastName}
              error={errors.includes('last name')}
              helperText={errors.includes('last name') ? 'Last name can\'t be empty.' : ''}
              onChange={(e) => handleFieldChange(e, setLastName)}
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
              name="job position"
              defaultValue={jobPosition}
              error={errors.includes('job position')}
              helperText={errors.includes('job position') ? 'Job position can\'t be empty.' : ''}
              onChange={(e) => handleFieldChange(e, setJobPosition)}
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
            children={changeStringAvatar(firstName)}
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