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
  const { cards, shortScoreType } = useTypedSelector((store) => store.settings);

  return(
    <li className="statistics__item">
      <h2 className="statistics__issueInfo">{currentIssue?.issue.id}</h2>
      <ul className="statistics__inner">
        {cards.map((card) => {
          return <StatisticsItem cardInfo={{type:shortScoreType, value:card}} currentIssue={currentIssue}/>
        })}
      </ul>
    </li>
  );
}
