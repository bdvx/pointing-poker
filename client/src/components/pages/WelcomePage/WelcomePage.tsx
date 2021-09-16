import './WelcomePage.scss';
import { FC, useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { LargeLogo } from '../../LargeLogo/LargeLogo';
import ServerService from '../../../serverService/serverService';
import { useTypedSelector } from '../../../hooky/useTypedSelector';
import { NewLobbyModel } from '../../../serverService/models/newLobbyModel';

export const WelcomePage: FC<{classes: string}> = ({classes}: {classes: string}) => {
  const currentUser = useTypedSelector(store=>store.userInfo);
  const onStartBtnClick = async () => {
    const newLobbyInfo:NewLobbyModel = {
      scramInfo:currentUser,
      roomId:currentUser.login
      //TODO хешированый айди
    }
    await  ServerService.makeNewRoom(newLobbyInfo);
  }

  return (
    <div className={`welcome-page ${ classes }`}>
      <LargeLogo />

      <span className="welcome-page__subtitle">Start your planning:</span>

      <Grid
        className="welcome-page__control-block"
        container
        justifyContent="space-between"
        alignItems="center"
      >
        <span className="welcome-page__control-block-text">Create session:</span>
        <Button
          className="welcome-page__control-block-btn"
          variant="contained"
          color="primary"
          size="large"
          onClick={onStartBtnClick}
        >
          Start new game
        </Button>
      </Grid>

      <span className="welcome-page__subtitle welcome-page__subtitle_margin_left">OR:</span>

      <div className="welcome-page__control-block">
        <span className="welcome-page__control-block-text welcome-page__control-block-text_block">
          Connect to lobby by { }
          <strong className="welcome-page__control-block-subtext">URL</strong>
          :
        </span>

        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <TextField
            className="welcome-page__control-block-field"
            variant="outlined"
            size="small"
          />
          <Button
            className="welcome-page__control-block-btn"
            variant="contained"
            color="primary"
            size="large"
          >
            Connect
          </Button>
        </Grid>
      </div>

    </div>
  );
}