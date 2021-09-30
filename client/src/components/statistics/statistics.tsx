import { useTypedSelector } from "../../hooky/useTypedSelector";
import { CardProps } from "../GameCard/GameCard";
import { StatisticsItem } from "./statisticsItem";
import "./statistics.scss";

const cards:Array<CardProps> = [{value:1,type:"a"},{value:2,type:"a"},{value:3,type:"a"},
{value:5,type:"a"},{value:8,type:"a"},{value:13,type:"a"},{value:21,type:"a"}]

interface StatisticsProps {
  issueId: string
}

export function Statistics(props: StatisticsProps) {
  const issuesInfo = useTypedSelector((store) => store.game.issuesInfo);
  const currentIssue = issuesInfo.find((issueInfo) => issueInfo.issue.id === props.issueId);

  return(
    <li className="statistics__item">
      <h2 className="statistics__issueInfo">{currentIssue?.issue.id}</h2>
      <ul className="statistics__inner">
        {cards.map((card) => {
          return <StatisticsItem cardInfo={card} currentIssue={currentIssue}/>
        })}
      </ul>
    </li>
  );
}
