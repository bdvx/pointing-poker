import './KickPlayerPopUp.scss';
import { FC } from 'react';
import IKickPlayerPopUp from '../../types/KickPlayerPopUp.type';
import { Button, Dialog, DialogActions } from '@material-ui/core';

export const KickPlayerPopUp: FC<IKickPlayerPopUp> = (props: IKickPlayerPopUp) => {
  const { open, onChangePopUpState } = props;

  return (
    <Dialog className="KickPlayerPopUp" open={ open } onClose={ () => onChangePopUpState(false) }>
      <h3 className="KickPlayerPopUp__title">Kick player?</h3>

      <p className="KickPlayerPopUp__text">Are you really want to remove player <strong>{ 'David Blane' }</strong> from game session?</p>

      <DialogActions className="KickPlayerPopUp__btns">
        <Button onClick={ () => onChangePopUpState(false) } variant="contained" color="primary" size="large">Yes</Button>
        <Button onClick={ () => onChangePopUpState(false) } variant="outlined" color="primary" size="large">No</Button>
      </DialogActions>
    </Dialog>
  );
};