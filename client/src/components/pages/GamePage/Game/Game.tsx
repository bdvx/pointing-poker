
import { FC, useState } from 'react';
import './Game.scss';
import { useTypedSelector } from '../../../../hooky/useTypedSelector';
import PlayerCard from '../../Lobby/PlayerCard/PlayerCard';
import { Button } from '@material-ui/core';
import { GameIssue } from '../GameIssue/GameIssue';
import Chat from '../../../Chat/Chat';
import { Queue } from '../../Lobby/Queue/queue';
import ServerService from '../../../../serverService/serverService';
import GameCard, { CardProps } from '../../../GameCard/GameCard';
import { GameSideBar } from '../GameSideBar/GameSideBar';
import { useDispatch } from 'react-redux';
import { resetRoomInfo } from '../../../../store/roomSlice';
import { resetChat } from '../../../../store/chatSlice';
import { useHistory } from 'react-router';
import { RoundTimePlayable } from '../../../RoundTimePlayable/RoundTimePlayable';

const cards:Array<CardProps> = [{value:1,type:"a"},{value:2,type:"a"},{value:3,type:"a"},
{value:5,type:"a"},{value:8,type:"a"},{value:13,type:"a"},{value:21,type:"a"}]

export const Game: FC = () => {
  const userInfo = useTypedSelector(store => store.userInfo);
  const { scrumInfo, roomId } = useTypedSelector(store => store.roomInfo);
  const { issuesInfo } = useTypedSelector(store => store.game);
  const dispatch = useDispatch();
  const router = useHistory();
  const isScrum = userInfo.isScrum;

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

  const onExitBtnClick = () => {
    ServerService.disconect(userInfo, roomId, `user ${userInfo.login} disconnect the room`);
    dispatch(resetRoomInfo());
    dispatch(resetChat());
    router.push('/welcomePage');
  }

  return (
    <div className="Game page__content">
      {isScrum?<Queue></Queue>:<></>}
      <Chat></Chat>
      <GameSideBar></GameSideBar>

      <div className="Game__main">
        <h2 className="Game__title">Some random game name</h2>

        <div className="Game__topPanel">
          <div className="Game__master">
            <span className="Game__masterTitle">Scrum master:</span>

            {/* TODO: нужно убрать для карточки мастера кик */}
            <PlayerCard {...scrumInfo} avatar={ scrumInfo.avatar || './logo192.png' } login="" />
          </div>

          { isScrum ?
              <Button className="Game__stopBtn" onClick={onStopGameBtnClick} variant="outlined" color="primary" size="large">Stop Game</Button>
            :
              <>
                <RoundTimePlayable />
                <Button className="Game__exitBtn" onClick={ onExitBtnClick } variant="outlined" color="primary" size="large">Exit</Button>
              </>
          }
        </div>

        <div className="Game__playground">
          <div className="Game__dashboardLeft">

            { issuesInfo.length ?
              <div className="Game__issues">
                <h3 className="Game__issuesTitle Game__subtitle">Issues:</h3>

                <ul className="Game__issuesContainer">
                  { issuesInfo.map((issueInfo) => (
                      <li className={  issueInfo.isVoting ? "voting" : (issueInfo.isSelected) ? "selected" : ""}  onClick={ () => onIssueClick(issueInfo.issue.id) }>

                        <GameIssue { ...issueInfo.issue } isActive={ issueInfo.isSelected } score={ issueInfo.result } />
                      </li>
                    ))
                  }
                </ul>
              </div> : null
            }

            { isScrum &&
              <div className="Game__statistics">
                <h3 className="Game__subtitle">Statistics:</h3>
                <div className="Game__statisticsContainer"></div>
              </div>
            }
          </div>

          { isScrum &&
            <div className="Game__dashboardRight">
              <>
                <RoundTimePlayable />

                <div className="Game__playgroundBtns">
                  <Button className="Game__runRoundBtn" onClick={ onRunIssueBtnClick } variant="contained" color="primary" size="large">Run round</Button>
                  <Button className="Game__restartRoundBtn" onClick={ onResetIssueBtnClick } variant="contained" color="primary" size="large">Restart round</Button>
                  <Button className="Game__nextIssueBtn" onClick={ onStopIssueBtnClick } variant="contained" color="primary" size="large">Stop round</Button>
                </div>
              </>
            </div>
          }
        </div>

        <div className="Game__cards">
          {cards.map((card) => <GameCard {...card}></GameCard>)}
        </div>
      </div>
    </div>
  );
};