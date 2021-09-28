import './LogInPopup.scss';
import { FC, useState } from 'react';
import { Button, DialogActions, TextField } from '@material-ui/core';
import { LogInOrSignUpPopup } from '../../Base/LogInOrSignUpPopup/LogInOrSignUpPopup';
import ILogInPopupProps from '../../../types/LogInPopupProps.type';
import IFieldsValues from '../../../types/LogInOrSignUpPopup.type';
import { LOGIN_POPUP_FIELDS } from '../../../constants';
import ServerService from '../../../serverService/serverService';
import { useHistory } from 'react-router';
import { PopUpLinearProgress } from '../../Base/PopUpLinearProgress/PopUpLinearProgress';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../../store/currentUserSlice';

export const LoginPopup: FC<ILogInPopupProps> = ({ open, onChangeLogInPopupState }: ILogInPopupProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [fieldsValues, setFieldsValues] = useState<IFieldsValues>({
    login: '',
    password: ''
  });

  const fieldsProps = { fieldsValues, setFieldsValues };
  const { handleFieldChange } = LogInOrSignUpPopup();
  const router = useHistory();

  const HandleConfirmLogin = async () => {
    setLoading(true);
    const response = await ServerService.signInUser(fieldsValues);

    if(response.isSuccess) {
      setLoading(false);
      alert(response.message);
      console.log(response)
      dispatch(setUserInfo({...response.body, isLogin:true}))
      //история должна пушится после закрытия попапа успешной регистрации
      router.push("/welcomePage");
      onChangeLogInPopupState(false);
    } else {
      setLoading(false);
      alert(response.message);
    }
  }

  return (
    <PopUpLinearProgress className="LogInPopup" open={ open } onClose={ () => onChangeLogInPopupState(false) } loading={ loading }>
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
    </PopUpLinearProgress>
  );
};