import "./GameIssue.scss";
import { FC } from "react";
import { IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { useTypedSelector } from "../../../../hooky/useTypedSelector";
import IGameIssueProps from "../../../../types/GameIssueProps.type";

/* 
  TODO:
    Проверить чтобы isScrum менялся для scrum master
    Пока что вместо будет использоватся переменная scrum, позже ее нужно будет заменить на isScrum
*/

export const GameIssue: FC<IGameIssueProps> = (props: IGameIssueProps) => {
  const { isScrum } = useTypedSelector(store => store.userInfo);
  const scrum = true;

  const { title, priority } = props;

  return (
    <div className="GameIssue">
      <div className="GameIssue__info">
        <div className="GameIssue__title">{ title }</div>
        <div className="GameIssue__priority">{ priority }</div>
      </div>

      { scrum &&
        <IconButton>
          <CloseIcon />
        </IconButton>
      }
    </div>
  );
};
