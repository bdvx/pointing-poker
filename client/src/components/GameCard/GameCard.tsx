import { useTypedSelector } from "../../hooky/useTypedSelector";
import { ChoiceModel } from "../../serverService/models/choiceModel";
import ServerService from "../../serverService/serverService";
import "./GameCard.scss";

export interface CardProps {
  value: string,
}

const GameCard = (props: CardProps) => {
  const { value } = props;
  const { issuesInfo, isVoting } = useTypedSelector(store => store.game);
  const { login } = useTypedSelector(store => store.userInfo);
  const type = useTypedSelector((store => store.settings.shortScoreType));

  const onChooseCard = () => {
    if(isVoting) {
      const currentIssueInfo = issuesInfo.find((issue) => issue.isSelected);
      if(currentIssueInfo) {
        const choiceInfo:ChoiceModel = {
          issueId: currentIssueInfo.issue.id,
          login: login,
          score: props.value
        }
        ServerService.makeChoice(choiceInfo);
      }
    }
  }

  return (
    <div onClick={onChooseCard} className="card-container">
      <div className="GameCard">
        <div className="GameCard_front">
          <div className="GameCard_type">{type}</div>
          <div className="GameCard_value">{value}</div>
          <div className="GameCard_type GameCard_type__reverse">{type}</div>
        </div>
        <div className="GameCard_back"></div>
      </div>
    </div>
  );
};

export default GameCard;
