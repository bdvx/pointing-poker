import { FC, useState } from 'react';
import './Game.scss';
import { useTypedSelector } from '../../../../hooky/useTypedSelector';
import PlayerCard from '../../Lobby/PlayerCard/PlayerCard';
import { Button } from '@material-ui/core';
import { GameIssue } from '../GameIssue/GameIssue';
import { useDispatch } from 'react-redux';
import Chat from '../../../Chat/Chat';
import { Queue } from '../../Lobby/Queue/queue';
import ServerService from '../../../../serverService/serverService';
import { RoundTimePlayable } from '../../../RoundTimePlayable/RoundTimePlayable';
import { RoundTimeEditable } from '../../../RoundTimeEditable/RoundTimeEditable';

/* 
  TODO:
    Проверить чтобы isScrum менялся для scrum master
    Пока что вместо будет использоватся переменная scrum, позже ее нужно будет заменить на isScrum
*/

export const Game: FC = () => {
  const { isScrum } = useTypedSelector(store => store.userInfo);
  const { scrumInfo } = useTypedSelector(store => store.roomInfo);
  const game = useTypedSelector(store => store.game);

  const [timeIsStop, setTimeIsStop] = useState<boolean>(true);

  const onStopGameBtnClick = () => {
    ServerService.stopGame();
  }


  return (
    <div className="Game">
      {isScrum?<Queue></Queue>:<></>}
      <Chat></Chat>
      <h2 className="Game__title">Some random game name</h2>

      <div className="Game__master">
        <span className="Game__masterTitle">Scrum master:</span>

        {/* TODO: нужно убрать для карточки мастера кик */}
        <PlayerCard avatar={ scrumInfo.avatar || './logo192.png' } firstName={ scrumInfo.firstName } 
                    lastName={ scrumInfo.lastName } jobPosition={ scrumInfo.jobPosition } login="" />

        { isScrum ?
            <Button className="Game__stopBtn" onClick={onStopGameBtnClick} variant="outlined" color="primary" size="large">Stop Game</Button>
          : 
            <div>
              <RoundTimePlayable isStop={ timeIsStop } setIsStop={ setTimeIsStop } secondsDefault={ 10 } minutesDefault={ 0 } />

              <Button className="Game__stopBtn" onClick={ () => false } variant="outlined" color="primary" size="large">Exit</Button>
            </div>
        }
      </div>
      
      <div className="Game__issues">
        <h3>Issues:</h3>

        <div className="Game__issuesContainer">
          {
            game.issuesInfo.map((issueInfo) => (
              <GameIssue title={ issueInfo.issue.title } priority={ issueInfo.issue.priority }
                             link={ issueInfo.issue.link } key={ issueInfo.issue.id } />
            ))
          }
        </div>
      </div>

      { isScrum &&
        <div>
          <RoundTimePlayable isStop={ timeIsStop } setIsStop={ setTimeIsStop } secondsDefault={ 10 } minutesDefault={ 0 } />

          <Button className="Game__runRoundBtn" onClick={ () => setTimeIsStop(false) } variant="contained" color="primary" size="large">Run round</Button>
          <Button className="Game__restartRoundBtn" onClick={ () => false } variant="contained" color="primary" size="large">Restart round</Button>
          <Button className="Game__nextIssueBtn" onClick={ () => false } variant="contained" color="primary" size="large">Next issue</Button>

          <div className="Game__statistics">
            <h3>Statistics:</h3>

            <div className="Game__statisticsContainer"></div>
          </div>
        </div>
      }
    </div>
  );
};