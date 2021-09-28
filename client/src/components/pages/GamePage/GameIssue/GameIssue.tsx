import "./GameIssue.scss";
import { FC } from "react";
import { IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { useTypedSelector } from "../../../../hooky/useTypedSelector";
import IGameIssueProps from "../../../../types/GameIssueProps.type";
import ServerService from "../../../../serverService/serverService";
import { Issue } from "../../../Base/Issue/Issue";

export const GameIssue: FC<IGameIssueProps> = (props: IGameIssueProps) => {
  const { isScrum } = useTypedSelector(store => store.userInfo);
  const { title, priority, score, isActive, link } = props;

  const onDeleteBtnClick = () => {
    ServerService.deleteIssue(props.id);
  }

  return (
    <Issue classes="GameIssue">
      <div className="Issue__info">
        { isActive &&
          <span>Current</span>
        }
        <a className="Issue__title" href={ link } target="_blank">{ title }</a>
        <span className="Issue__priority">{ priority }</span>
      </div>

      { score &&
        <span className="GameIssue__score">{ score }</span>
      }

      { isScrum &&
        <IconButton>
          <CloseIcon onClick={ onDeleteBtnClick } />
        </IconButton>
      }
    </Issue>
  );
};
