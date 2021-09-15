import './LogInPopup.scss';
import { FC, useState } from 'react';
import { Button, Dialog, DialogActions, TextField } from '@material-ui/core';
import { LogInOrSignUpPopup } from '../../Base/LogInOrSignUpPopup/LogInOrSignUpPopup';
import ILogInPopupProps from '../../../types/LogInPopupProps.type';
import IFieldsValues from '../../../types/LogInOrSignUpPopup.type';
import { LOGIN_POPUP_FIELDS } from '../../../constants';

export const LoginPopup: FC<ILogInPopupProps> = ({ open, onChangeLogInPopupState }: ILogInPopupProps) => {
  const [fieldsValues, setFieldsValues] = useState<IFieldsValues>({
    login: '',
    password: ''
  });

  const fieldsProps = { fieldsValues, setFieldsValues };
  const { handleFieldChange } = LogInOrSignUpPopup();

  return (
    <Dialog className="LogInPopup" open={ open } onClose={ () => onChangeLogInPopupState(false) }>
      <form>
        {
          LOGIN_POPUP_FIELDS.map((fieldName) => (
            <div className="LogInPopup__fieldContainer" key={ fieldName }>
              <label>
                <TextField
                  className="LogInPopup__field"
                  defaultValue={ fieldsValues[fieldName as keyof IFieldsValues] }
                  onChange={ (e) => handleFieldChange({ e, ...fieldsProps }) }
                  name={ fieldName }
                  type={ fieldName === 'password' ? 'password' : 'text' }
                  label={ fieldName }
                  variant="outlined"
                  size="small"
                />
              </label>
            </div>
          ))
        }

        <DialogActions className="LogInPopup__actions">
          <Button onClick={ () => onChangeLogInPopupState(false) } variant="contained" color="primary" size="large">Confirm</Button>
          <Button onClick={ () => onChangeLogInPopupState(false) } variant="outlined" color="primary" size="large">Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};