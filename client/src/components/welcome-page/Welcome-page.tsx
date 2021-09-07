import './Welcome-page.scss';
import { Box, Button, Grid, TextField } from '@material-ui/core';
import pokerCardsImg from '../../assets/icons/poker-cards.svg';
import { FC } from 'react';
import { bp } from '../../material-ui-variables';

declare module '@material-ui/core/Box' {
  interface BoxProps {
    src?: string;
    alt?: string
  }
}

export const WelcomePage: FC<{classes: string}> = ({classes}: {classes: string}) => {
  return (
    <div className={`welcome-page ${ classes }`}>
      <Box
        className="welcome-page__header"
        sx={{
          [bp.up('phone')]: {
            display: 'flex',
            justifyContent: 'center'
          }
        }}
      >
        <Box
          component="img"
          className="welcome-page__header-logo"
          src={pokerCardsImg}
          alt="Poker cards"
          sx={{
            [bp.down(bp.values.phone)]: {
              display: 'block',
              margin: 'auto'
            },
            [bp.up('phone')]: {
              marginTop: -60,
              marginRight: 25
            }
          }}
        />

        <Box
          className="welcome-page__header-heading"
          sx={{
            [bp.down(bp.values.phone)]: {
              margin: 'auto',
              '&::before': {
                display: 'none'
              }
            }
          }}
        >
          <span className="welcome-page__header-title welcome-page__header-title-1">Poker</span>
          <span className="welcome-page__header-title welcome-page__header-title-2">Planning</span>
        </Box>
      </Box>

      <Box
        className="welcome-page__subtitle"
        component="span"
        color={'secondary.main'}
      >
        Start your planning:
      </Box>

      <Grid
        className="welcome-page__control-block"
        container
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          className="welcome-page__control-block-text"
          component="span"
          sx={{
            [bp.down(bp.values['phone-xl'])]: {
              marginBottom: 15
            }
          }}
        >
          Create session:
        </Box>
        <Button
          className="welcome-page__control-block-btn"
          variant="contained"
          color="primary"
          size="large"
        >
          Start new game
        </Button>
      </Grid>

      <Box
        className="welcome-page__subtitle welcome-page__subtitle-2"
        component="span"
        color={'secondary.main'}
        sx={{
          [bp.up(bp.values['phone-xl'])]: {
            marginLeft: 200
          }
        }}
      >
        OR:
      </Box>

      <div className="welcome-page__control-block">
        <span className="welcome-page__control-block-text welcome-page__control-block-text_block">
          Connect to lobby by { }
          <Box component="strong" color={'secondary.main'}>URL</Box>
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