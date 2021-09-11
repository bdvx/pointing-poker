import './StartPage.scss';
import { FC } from 'react';
import { Button } from '@material-ui/core';
import { LargeLogo } from '../LargeLogo/LargeLogo';

export const StartPage: FC<{classes: string}> = ({classes}: {classes: string}) => {
  return (
    <div className={`startPage ${ classes }`}>
      <LargeLogo />

      <Button variant="contained" color="primary" size="large">Sign up</Button>
      <Button variant="contained" color="primary" size="large">Log in</Button>
    </div>
  );
};