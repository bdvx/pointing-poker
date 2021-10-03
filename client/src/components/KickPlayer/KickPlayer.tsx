import { Button, DialogActions } from '@material-ui/core';
import { useTypedSelector } from '../../hooky/useTypedSelector';
import { VotingModel } from '../../serverService/models/votingModel';
import ServerService from '../../serverService/serverService';
import "./KickPlayerContainer";

export const KickPlayerItem = (props: VotingModel) => {
  const currentUserLogin = useTypedSelector((store) => store.userInfo.login);
  const { message, whoOffer, whoKick, votes } = props;
  let canCurrentUserVotin = false;

  votes?.forEach((vote) => {
    if(currentUserLogin === vote.login && vote.conclusion === null) {
      canCurrentUserVotin = true;
    }
  })

  if(currentUserLogin === whoKick || currentUserLogin === whoOffer) {
    canCurrentUserVotin = false;
  }

  return (
    <li className="KickPlayerPopUp">
      <h3 className="KickPlayerPopUp__title">{whoOffer} offers kick player {whoKick}</h3>
      <p>amountAgree: {props.amountAgree} / {votes?.length}</p>
      <p className="KickPlayerPopUp__text">{message}</p>

      {canCurrentUserVotin ? 
      <DialogActions className="KickPlayerPopUp__btns">
        <Button onClick={ ()=> ServerService.setKickConclusion(true, currentUserLogin, whoKick) } variant="contained" color="primary" size="large">Yes</Button>
        <Button onClick={ ()=> ServerService.setKickConclusion(false, currentUserLogin, whoKick) } variant="outlined" color="primary" size="large">No</Button>
      </DialogActions> :
      <></>
      }

    </li>
  );
};