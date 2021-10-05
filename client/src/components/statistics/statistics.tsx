import { useTypedSelector } from "../../hooky/useTypedSelector";
import { CardProps } from "../GameCard/GameCard";
import { StatisticsItem } from "./statisticsItem";
import "./statistics.scss";

interface StatisticsProps {
  issueId: string
}

export function Statistics(props: StatisticsProps) {
  const issuesInfo = useTypedSelector((store) => store.game.issuesInfo);
  const currentIssue = issuesInfo.find((issueInfo) => issueInfo.issue.id === props.issueId);
  const { shortScoreType } = useTypedSelector((store) => store.settings);

  return(
    <li className="statistics__item">
      <h2 className="statistics__issueInfo">issue Id: {currentIssue?.issue.id}</h2>
      <ul className="statistics__inner">
        {currentIssue?.votes.map((vote) => {
          if(currentIssue?.votes.length !== 0) {
            return <StatisticsItem cardInfo={{type:shortScoreType, value:vote.score}} currentIssue={currentIssue}/>
          } else {
            return <></>;
          }
        })}
      </ul>
    </li>
  );
}
