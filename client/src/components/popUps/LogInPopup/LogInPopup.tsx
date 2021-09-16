import './LogInPopup.scss';
import { FC, useState } from 'react';
import { Button, Dialog, DialogActions, TextField } from '@material-ui/core';
import { LogInOrSignUpPopup } from '../../Base/LogInOrSignUpPopup/LogInOrSignUpPopup';
import ILogInPopupProps from '../../../types/LogInPopupProps.type';
import IFieldsValues from '../../../types/LogInOrSignUpPopup.type';
import { LOGIN_POPUP_FIELDS } from '../../../constants';
import ServerService from '../../../serverService/serverService';
import { useHistory } from 'react-router';

export const LoginPopup: FC<ILogInPopupProps> = ({ open, onChangeLogInPopupState }: ILogInPopupProps) => {
  const [fieldsValues, setFieldsValues] = useState<IFieldsValues>({
    login: '',
    password: ''
  });

  const fieldsProps = { fieldsValues, setFieldsValues };
  const { handleFieldChange } = LogInOrSignUpPopup();
  const router = useHistory();

  const HandleConfirmLogin = async () => {
    const response = await ServerService.signInUser(fieldsValues);

    //TODO прикрутить лоадер
    if(response.isSuccess) {
      alert(response.message);
      //история должна пушится после закрытия попапа успешной регистрации
      router.push("/welcomePage");
      onChangeLogInPopupState(false);
    } else {
      alert(response.message);
    }
  }

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
          <Button onClick={HandleConfirmLogin} variant="contained" color="primary" size="large">Confirm</Button>
          <Button onClick={() => onChangeLogInPopupState(false)} variant="outlined" color="primary" size="large">Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};