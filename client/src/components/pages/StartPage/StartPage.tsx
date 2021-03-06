import './StartPage.scss';
import { FC, useState } from 'react';
import { Button } from '@material-ui/core';
import { LargeLogo } from '../../LargeLogo/LargeLogo';
import { RegisterPopup } from '../../popUps/RegisterPopup/RegisterPopup';
import { LoginPopup } from '../../popUps/LogInPopup/LogInPopup';

export const StartPage: FC = () => {
  const [registerPopupOpen, setRegisterPopupOpen] = useState(false);
  const [LogInPopupOpen, setLogInPopupOpen] = useState(false);

  return (
    <div className="startPage page__content">
      <LargeLogo />

      <Button onClick={ () => setRegisterPopupOpen(true) } variant="contained" color="primary" size="large">Sign up</Button>
      <Button onClick={ () => setLogInPopupOpen(true) } variant="contained" color="primary" size="large">Log in</Button>

      <RegisterPopup open={registerPopupOpen} onChangeRegisterPopupState={(open) => setRegisterPopupOpen(open)} />
      <LoginPopup open={LogInPopupOpen} onChangeLogInPopupState={(open) => setLogInPopupOpen(open)} />
    </div>
  );
};