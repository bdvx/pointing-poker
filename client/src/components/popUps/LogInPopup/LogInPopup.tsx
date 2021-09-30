import './LogInPopup.scss';
import { ChangeEvent, FC, useState } from 'react';
import { Button, DialogActions, TextField } from '@material-ui/core';
import ILogInPopupProps from '../../../types/LogInPopupProps.type';
import IFieldsValues from '../../../types/LogInOrSignUpPopup.type';
import { LOGIN_POPUP_FIELDS } from '../../../constants';
import ServerService from '../../../serverService/serverService';
import { useHistory } from 'react-router';
import { PopUpLinearProgress } from '../../Base/PopUpLinearProgress/PopUpLinearProgress';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../../store/currentUserSlice';

export const LoginPopup: FC<ILogInPopupProps> = ({ open, onChangeLogInPopupState }: ILogInPopupProps) => {
  const router = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [fieldsValues, setFieldsValues] = useState<IFieldsValues>({ login: '', password: '' });

  const HandleConfirmLogin = async () => {
    setLoading(true);

    const response = await ServerService.signInUser(fieldsValues);

    if(response.isSuccess) {
      setLoading(false);
      alert(response.message);
      console.log(response)
      dispatch(setUserInfo({...response.body, isLogin:true}))
      setFieldsValues({ login: '', password: '' });
      router.push("/welcomePage");
      onChangeLogInPopupState(false);
    } else {
      setLoading(false);
      alert(response.message);
    }
  }

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { value, name } = e.target;
    setFieldsValues({ ...fieldsValues, [name]: value });
  };

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
                  onChange={ handleFieldChange }
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