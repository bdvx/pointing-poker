import "./GameIssue.scss";
import { FC } from "react";
import { IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { useTypedSelector } from "../../../../hooky/useTypedSelector";
import IGameIssueProps from "../../../../types/GameIssueProps.type";

export const GameIssue: FC<IGameIssueProps> = (props: IGameIssueProps) => {
  const { isScrum } = useTypedSelector(store => store.userInfo);
  const { title, priority, score, isActive } = props;

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
          <CloseIcon />
        </IconButton>
      }
    </div>
  );
};
