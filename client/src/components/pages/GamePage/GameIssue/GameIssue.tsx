import "./GameIssue.scss";
import { FC } from "react";
import { IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { useTypedSelector } from "../../../../hooky/useTypedSelector";
import IGameIssueProps from "../../../../types/GameIssueProps.type";
import ServerService from "../../../../serverService/serverService";

export const GameIssue: FC<IGameIssueProps> = (props: IGameIssueProps) => {
  const { isScrum } = useTypedSelector(store => store.userInfo);
  const { title, priority, score, isActive } = props;

  const onDeleteBtnClick = () => {
    ServerService.deleteIssue(props.id);
  }

  return (
    <div className="GameIssue">
      <div className="GameIssue__info">
        { isActive &&
          <span>Current</span>
        }
        <h4 className="GameIssue__title">{ title }</h4>
        <span className="GameIssue__priority">{ priority }</span>
      </div>

      { score &&
        <span className="GameIssue__score">{ score }</span>
      }

      { isScrum &&
        <IconButton>
          <CloseIcon onClick={onDeleteBtnClick}/>
        </IconButton>
      }
    </div>
  );
};
