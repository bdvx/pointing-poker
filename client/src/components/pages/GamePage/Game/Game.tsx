import { FC, useEffect } from 'react';
import './Game.scss';
import { useTypedSelector } from '../../../../hooky/useTypedSelector';
import PlayerCard from '../../Lobby/PlayerCard/PlayerCard';
import { Button } from '@material-ui/core';
import { GameIssue } from '../GameIssue/GameIssue';
import Chat from '../../../Chat/Chat';
import { Queue } from '../../Lobby/Queue/queue';
import ServerService from '../../../../serverService/serverService';
import { IssueModel } from '../../../../serverService/models/issueModel';
/* 
  TODO:
    Проверить чтобы isScrum менялся для scrum master
    Пока что вместо будет использоватся переменная scrum, позже ее нужно будет заменить на isScrum
*/

export const Game: FC = () => {
  const { isScrum } = useTypedSelector(store => store.userInfo);
  const { scrumInfo } = useTypedSelector(store => store.roomInfo);
  const { issuesInfo } = useTypedSelector(store => store.game);

  const onStopGameBtnClick = () => {
    ServerService.stopGame();
  }

  const onIssueClick = (issueId:string) => {
    const votingIssue = issuesInfo.find((ussueInfo) => ussueInfo.isVoting);
    if(!votingIssue) {
      ServerService.selectIssue(issueId);
    }
  }

  const onStartRunBtnClick = () => {
    const currentIssueInfo = issuesInfo.find((issue) => issue.isSelected);
    if(currentIssueInfo) {
      ServerService.startVoteIssue(currentIssueInfo?.issue.id);
    } else {
      alert("Сначала выберите issue")
    }
  
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
              <div className="Game__timer"></div>

              <Button className="Game__stopBtn" onClick={ () => false } variant="outlined" color="primary" size="large">Exit</Button>
            </div>
        }
      </div>
      
      <div className="Game__issues">
        <h3>Issues:</h3>

        <ul className="Game__issuesContainer">
          {
            issuesInfo.map((issueInfo) => (
              <li className={  issueInfo.isVoting ? "voting" : (issueInfo.isSelected) ? "selected" : ""} onClick={() => onIssueClick(issueInfo.issue.id)}>
                <GameIssue title={ issueInfo.issue.title } priority={ issueInfo.issue.priority }
                          link={ issueInfo.issue.link } key={ issueInfo.issue.id } id={ issueInfo.issue.id }/>
              </li>
            ))
          }
        </ul>
      </div>

      { isScrum &&
        <div>
          <div className="Game__timer"></div>

          <Button className="Game__runRoundBtn" onClick={ onStartRunBtnClick } variant="contained" color="primary" size="large">Run round</Button>
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