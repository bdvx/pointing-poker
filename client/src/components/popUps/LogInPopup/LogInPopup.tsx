import './LogInPopup.scss';
import { ChangeEvent, FC, useState } from 'react';
import { Button, DialogActions, TextField } from '@material-ui/core';
import ILogInPopupProps from '../../../types/LogInPopupProps.type';
import IFieldsValues from '../../../types/LogInOrSignUpPopup.type';
import { BASE_URL, LOGIN_POPUP_FIELDS } from '../../../constants';
import ServerService from '../../../serverService/serverService';
import { useHistory } from 'react-router';
import { PopUpLinearProgress } from '../../Base/PopUpLinearProgress/PopUpLinearProgress';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../../store/currentUserSlice';
import { FailPopUp } from '../../Base/FailPopUp/FailPopUp';

export const LoginPopup: FC<ILogInPopupProps> = ({ open, onChangeLogInPopupState }: ILogInPopupProps) => {
  const router = useHistory();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [fieldsValues, setFieldsValues] = useState<IFieldsValues>({ login: '', password: '' });

  const [openFailPopup, setOpenFailPopup] = useState<boolean>(false);

  const HandleConfirmLogin = async () => {
    setLoading(true);

    const response = await ServerService.signInUser(fieldsValues);

    if(response.isSuccess) {
      setLoading(false);
      dispatch(setUserInfo({...response.body, isLogin:true}))
      setFieldsValues({ login: '', password: '' });
      router.push(`${BASE_URL}/welcomePage`);
      onChangeLogInPopupState(false);
    } else {
      setLoading(false);
      setOpenFailPopup(true);
    }
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { value, name } = e.target;
    setFieldsValues({ ...fieldsValues, [name]: value });
  };

  return (
    <>
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

      <FailPopUp open={ openFailPopup } onChangeFailPopUpState={ (open) => setOpenFailPopup(open) } title="Fail Log In" description="This is an error alert — check it out!" />
    </>
  );
};