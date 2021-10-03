import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../../hooky/useTypedSelector";
import { updateCard } from "../../../../store/settingsSlice";
import { CardProps } from "../../../GameCard/GameCard";
import "./CardEditable.scss";


const EditableGameCard = (props: CardProps) => {
  const { value } = props;
  let currentValue = value;
  const type = useTypedSelector((store) => store.settings.shortScoreType);
  const dispatch = useDispatch();
  // const { issuesInfo, isVoting } = useTypedSelector(store => store.game);
  // const { login } = useTypedSelector(store => store.userInfo);

  // const onChooseCard = () => {
  //   if(isVoting) {
  //     const currentIssueInfo = issuesInfo.find((issue) => issue.isSelected);
  //     if(currentIssueInfo) {
  //       const choiceInfo:ChoiceModel = {
  //         issueId: currentIssueInfo.issue.id,
  //         login: login,
  //         score: props.value
  //       }
  //       ServerService.makeChoice(choiceInfo);
  //     }
  //   }
  //
  const handleValue = () => {
      dispatch(updateCard({currentValue,value}))
  };

  return (
    <div className="card-container CardEditable">
      <div className="GameCard">
        <div className="GameCard_front">
          <div className="GameCard_type">{type}</div>
          <input
            className="GameCard_value-input"
            defaultValue={value}
            onChange={handleValue}
          ></input>
          <div className="GameCard_type GameCard_type__reverse">{type}</div>
        </div>
        <div className="GameCard_back"></div>
      </div>
    </div>
  );
};

export default EditableGameCard;
