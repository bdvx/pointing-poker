import './Welcome-page.scss';
import { FC } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import pokerCardsImg from '../../assets/icons/poker-cards.svg';

export const WelcomePage: FC<{classes: string}> = ({classes}: {classes: string}) => {
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

      <span className="welcome-page__subtitle" color={'secondary.main'}>Start your planning:</span>

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
        >
          Start new game
        </Button>
      </Grid>

      <span className="welcome-page__subtitle welcome-page__subtitle_margin_left" color={'secondary.main'}>OR:</span>

      <div className="welcome-page__control-block">
        <span className="welcome-page__control-block-text welcome-page__control-block-text_block">
          Connect to lobby by { }
          <strong color={'secondary.main'}>URL</strong>
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