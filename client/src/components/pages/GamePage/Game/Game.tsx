
import { FC, useState } from 'react';
import './Game.scss';
import { useTypedSelector } from '../../../../hooky/useTypedSelector';
import PlayerCard from '../../Lobby/PlayerCard/PlayerCard';
import { Button } from '@material-ui/core';
import { GameIssue } from '../GameIssue/GameIssue';
import Chat from '../../../Chat/Chat';
import { Queue } from '../../Lobby/Queue/queue';
import ServerService from '../../../../serverService/serverService';
import { RoundTimePlayable } from '../../../RoundTimePlayable/RoundTimePlayable';
import GameCard, { CardProps } from '../../../GameCard/GameCard';

const cards:Array<CardProps> = [{value:1,type:"a"},{value:2,type:"a"},{value:3,type:"a"},
{value:5,type:"a"},{value:8,type:"a"},{value:13,type:"a"},{value:21,type:"a"}]

export const Game: FC = () => {
  const { isScrum } = useTypedSelector(store => store.userInfo);
  const { scrumInfo } = useTypedSelector(store => store.roomInfo);
  const { issuesInfo } = useTypedSelector(store => store.game);

  const [timeIsStop, setTimeIsStop] = useState<boolean>(true);

  const onStopGameBtnClick = () => {
    ServerService.stopGame();
  }

  const onIssueClick = (issueId:string) => {
    const votingIssue = issuesInfo.find((ussueInfo) => ussueInfo.isVoting);
    if(!votingIssue) {
      ServerService.selectIssue(issueId);
    }
  }

  const onRunIssueBtnClick = () => {
    const currentIssueInfo = issuesInfo.find((issue) => issue.isSelected);
    if(currentIssueInfo) {
      setTimeIsStop(false);
      ServerService.startVoteIssue(currentIssueInfo.issue.id);
    } else {
      alert("Сначала выберите issue")
    }
  }

  const onResetIssueBtnClick = () => {
    const currentIssueInfo = issuesInfo.find((issue) => issue.isSelected);
    if(currentIssueInfo) {
      ServerService.resetVoteIssue(currentIssueInfo.issue.id);
    } else {
      alert("нечего сбрасывать :(")
    }
  }

  const onStopIssueBtnClick = () => {
    const currentIssueInfo = issuesInfo.find((issue) => issue.isSelected);
    if(currentIssueInfo) {
      ServerService.stopVoteIssue(currentIssueInfo.issue.id);
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
              <RoundTimePlayable isStop={ timeIsStop } setIsStop={ setTimeIsStop } secondsDefault={ 10 } minutesDefault={ 0 } />

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
                <h1>Issue Result: {issueInfo.result}</h1>
              </li>
            ))
          }
        </ul>
      </div>

        <div className="card__wrapper">
          {cards.map((card) => <GameCard {...card}></GameCard>)}
        </div>

      { isScrum &&
        <div>
          <RoundTimePlayable isStop={ timeIsStop } setIsStop={ setTimeIsStop } secondsDefault={ 10 } minutesDefault={ 0 } />

          <Button className="Game__runRoundBtn" onClick={ onRunIssueBtnClick } variant="contained" color="primary" size="large">Run round</Button>
          <Button className="Game__restartRoundBtn" onClick={ onResetIssueBtnClick } variant="contained" color="primary" size="large">Restart round</Button>
          <Button className="Game__nextIssueBtn" onClick={ onStopIssueBtnClick } variant="contained" color="primary" size="large">Stop issue</Button>

          <div className="Game__statistics">
            <h3>Statistics:</h3>

            <div className="Game__statisticsContainer"></div>
          </div>
        </div>
      }
    </div>
  );
};