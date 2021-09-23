import { FC, useEffect } from 'react';
import './Game.scss';
import { useTypedSelector } from '../../../../hooky/useTypedSelector';
import PlayerCard from '../../Lobby/PlayerCard/PlayerCard';
import { Button } from '@material-ui/core';
import { GameIssue } from '../GameIssue/GameIssue';
import { useDispatch } from 'react-redux';
import { setGame } from '../../../../store/gameSlice';

/* 
  TODO:
    Проверить чтобы isScrum менялся для scrum master
    Пока что вместо будет использоватся переменная scrum, позже ее нужно будет заменить на isScrum
*/

export const Game: FC = () => {
  const { isScrum } = useTypedSelector(store => store.userInfo);
  const { scrumInfo } = useTypedSelector(store => store.roomInfo);
  const { issues } = useTypedSelector(store => store.game);
  const dispatch = useDispatch();

  const scrum = true;

  // Для наглядности
  useEffect(() => {
    dispatch(setGame({
      issues: [
        {
          title: 'Issue 1',
          priority: 'Low priority',
          link: '/issue-1',
          id: '1'
        },
        {
          title: 'Issue 2',
          priority: 'Low priority',
          link: '/issue-2',
          id: '2'
        },
        {
          title: 'Issue 3',
          priority: 'Low priority',
          link: '/issue-3',
          id: '3'
        }
      ]
    }));
  }, []);

  return (
    <div className="Game">
      <h2 className="Game__title">Some random game name</h2>

      <div className="Game__master">
        <span className="Game__masterTitle">Scrum master:</span>

        {/* TODO: нужно убрать для карточки мастера кик */}
        <PlayerCard image={ scrumInfo.avatar || './logo192.png' } name={ scrumInfo.firstName } surname={ scrumInfo.lastName } position={ scrumInfo.jobPosition } />

        { scrum ?
            <Button className="Game__stopBtn" onClick={ () => false } variant="outlined" color="primary" size="large">Stop Game</Button>
          : 
            <div>
              <div className="Game__timer"></div>

              <Button className="Game__stopBtn" onClick={ () => false } variant="outlined" color="primary" size="large">Exit</Button>
            </div>
        }
      </div>
      
      <div className="Game__issues">
        <h3>Issues:</h3>

        <div className="Game__issuesContainer">
          {
            issues.map((issue) => (
              <GameIssue title={ issue.title } priority={ issue.priority } link={ issue.link } key={ issue.id } />
            ))
          }
        </div>
      </div>

      { scrum &&
        <div>
          <div className="Game__timer"></div>

          <Button className="Game__runRoundBtn" onClick={ () => false } variant="contained" color="primary" size="large">Run round</Button>
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