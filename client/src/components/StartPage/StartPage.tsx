import './StartPage.scss';
import { FC, useState } from 'react';
import { Button } from '@material-ui/core';
import { LargeLogo } from '../LargeLogo/LargeLogo';
import { RegisterPopup } from '../RegisterPopup/RegisterPopup';
import { LoginPopup } from '../LogInPopup/LogInPopup';

export const StartPage: FC<{classes: string}> = ({classes}: {classes: string}) => {
  const [registerPopupOpen, setRegisterPopupOpen] = useState(false);
  const [LogInPopupOpen, setLogInPopupOpen] = useState(false);

  return (
    <div className={`startPage ${ classes }`}>
      <LargeLogo />

      <Button onClick={ () => setRegisterPopupOpen(true) } variant="contained" color="primary" size="large">Sign up</Button>
      <Button onClick={ () => setLogInPopupOpen(true) } variant="contained" color="primary" size="large">Log in</Button>

      <RegisterPopup open={registerPopupOpen} onChangeRegisterPopupState={(open) => setRegisterPopupOpen(open)} />
      <LoginPopup open={LogInPopupOpen} onChangeLogInPopupState={(open) => setLogInPopupOpen(open)} />
    </div>
  );
};