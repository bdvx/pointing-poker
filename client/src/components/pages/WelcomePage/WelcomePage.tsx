import './WelcomePage.scss';
import { FC, useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { LargeLogo } from '../../LargeLogo/LargeLogo';
import ServerService from '../../../serverService/serverService';
import { useTypedSelector } from '../../../hooky/useTypedSelector';
import { useHistory } from 'react-router';
import { setScrumStatus } from '../../../store/currentUserSlice';
import { UserInfo } from '../../../serverService/models/userInfoModel';
import { useDispatch } from 'react-redux';


export const WelcomePage: FC<{classes: string}> = ({classes}: {classes: string}) => {
  const currentUserInfo = useTypedSelector(store => store.userInfo);
  const currentRoom = useTypedSelector(store => store.roomInfo);
  const [url, setUrl] = useState('');
  const router = useHistory();
  const dispatch = useDispatch();

  ServerService.setDispatch(dispatch);

  const onStartBtnClick = () => {
    setScrumStatus(true);
    const userInfoCopy = makeUserInfoCopy(currentUserInfo, true);
    ServerService.makeNewRoom(userInfoCopy);
    router.push("/lobbyStart");
  }

  const onConnectToLobbyBtnClick = () => {
    setScrumStatus(false);
    const userInfoCopy = makeUserInfoCopy(currentUserInfo, false);
    //TODO при введении url разу добавлять в стейт
    const roomId = defineIdfromUrl(url);
    ServerService.connectToRoom(userInfoCopy, roomId);
    //TODO коннект уже в саму игру (нужно в Room хранить поле isInGame)
    router.push("/lobbyStart");
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
            value={url}
            onChange={(e)=>setUrl(e.target.value)}
          />
          <Button
            className="welcome-page__control-block-btn"
            variant="contained"
            color="primary"
            size="large"
            onClick={onConnectToLobbyBtnClick}
          >
            Connect
          </Button>
        </Grid>
      </div>

    </div>
  );
}

function makeUserInfoCopy (currentUserInfo:UserInfo, isScrum:boolean) {
  const userInfoCopy:UserInfo = {
    ...currentUserInfo,
    isScrum: isScrum
  }
  return userInfoCopy;
}

function defineIdfromUrl(urlStr:string) {
  const urlArr = urlStr.split('/');
  return urlArr[urlArr.length-1];
}