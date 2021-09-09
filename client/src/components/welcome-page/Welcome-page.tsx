import './Welcome-page.scss';
import { FC, useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import pokerCardsImg from '../../assets/icons/poker-cards.svg';
import { RegisterPopup } from '../RegisterPopup/RegisterPopup';

export const WelcomePage: FC<{classes: string}> = ({classes}: {classes: string}) => {
  const [registerPopupOpen, setRegisterPopupOpen] = useState(false);

  return (
    <div className={`welcome-page ${ classes }`}>
      <div className="welcome-page__header">
        <img
          className="welcome-page__header-logo"
          src={pokerCardsImg}
          alt="Poker cards"
        />

        <div className="welcome-page__header-heading">
          <span className="welcome-page__header-title welcome-page__header-title-1">Poker</span>
          <span className="welcome-page__header-title welcome-page__header-title-2">Planning</span>
        </div>
      </div>

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
          onClick={() => setRegisterPopupOpen(true)}
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

      <RegisterPopup classes="app__register-popup" open={registerPopupOpen} onChangeRegisterPopupState={(open: boolean) => setRegisterPopupOpen(open)} />
    </div>
  );
}