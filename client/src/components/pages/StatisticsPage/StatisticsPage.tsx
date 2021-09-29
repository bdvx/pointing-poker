import { useTypedSelector } from "../../../hooky/useTypedSelector"
import { Statistics } from "../../statistics/statistics";
import "./Statistics.scss";

export function StatisticsPage() {
  const issusInfo = useTypedSelector((store) => store.game.issuesInfo);
  return(
    <div className="statisticsPage">
      <ul className="statistics__wrapper">
        {issusInfo.map((issueInfo) => <Statistics  issueId={issueInfo.issue.id}/>)}
      </ul>
    </div>
  )
}