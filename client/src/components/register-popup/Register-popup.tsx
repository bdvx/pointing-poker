import './Register-popup.scss';
import { FC } from 'react';
import { Avatar, Button, Dialog, DialogActions, Input, Switch, TextField } from '@material-ui/core';
import IRegisterPopupProps from '../../types/register-popup-props.type';

export const RegisterPopup: FC<IRegisterPopupProps> = ({classes, open, onChangeRegisterPopupState}: IRegisterPopupProps) => {
  return (
    <Dialog className={`register-popup ${ classes }`} open={open} onClose={() => onChangeRegisterPopupState(false)}>
      <form className="register-popup__form">
        <div className="register-popup__header">
          <h3 className="register-popup__title">Connect to lobby</h3>
          <label className="register-popup__role-block">
            <span className="register-popup__role-title">Connect as<br/>Observer</span>
            <Switch
              className="register-popup__role"
              defaultChecked
              color="primary"
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
            />
          </label>
        </div>

        <div className="register-popup__avatar-block">
          <span className="register-popup__field-title">Image:</span>

          <div className="register-popup__avatar-btns">
            <label htmlFor="register-popup__avatar-file">
              <Input
                id="register-popup__avatar-file"
                type="file"
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
            >
              Button
            </Button>
          </div>

          <Avatar
            className="register-popup__avatar"
            alt="Avatar"
            src=""
          />
        </div>
        <DialogActions className="register-popup__btns">
          <Button
            variant="contained"
            color="primary"
            size="large"
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