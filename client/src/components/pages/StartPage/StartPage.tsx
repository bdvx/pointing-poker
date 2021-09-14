import './StartPage.scss';
import { FC, useState } from 'react';
import { Button } from '@material-ui/core';
import { LargeLogo } from '../../LargeLogo/LargeLogo';
import { RegisterPopup } from '../../popUps/RegisterPopup/RegisterPopup';

export const StartPage: FC<{classes: string}> = ({classes}: {classes: string}) => {
  const [registerPopupOpen, setRegisterPopupOpen] = useState(false);

  return (
    <div className={`startPage ${ classes }`}>
      <LargeLogo />

      <Button onClick={ () => setRegisterPopupOpen(true) } variant="contained" color="primary" size="large">Sign up</Button>
      <Button variant="contained" color="primary" size="large">Log in</Button>

      <RegisterPopup classes="" open={registerPopupOpen} onChangeRegisterPopupState={(open) => setRegisterPopupOpen(open)} />
    </div>
  );
};