import './KickPlayerPopUp.scss';
import { FC } from 'react';
import { Button, DialogActions } from '@material-ui/core';
import { VotingModel } from '../../../serverService/models/votingModel';
import ServerService from '../../../serverService/serverService';

export const KickPlayerPopUp = (props: VotingModel) => {
  const { message, whoOffer, whoKick } = props;

  return (
    <div className="KickPlayerPopUp">
      <h3 className="KickPlayerPopUp__title">{whoOffer} offers kick player {whoKick}</h3>

      <p className="KickPlayerPopUp__text">{message}</p>

      <DialogActions className="KickPlayerPopUp__btns">
        <Button onClick={ ()=> ServerService.setKickConclusion(true, whoKick) } variant="contained" color="primary" size="large">Yes</Button>
        <Button onClick={ ()=> ServerService.setKickConclusion(false, whoKick) } variant="outlined" color="primary" size="large">No</Button>
      </DialogActions>
    </div>
  );
};