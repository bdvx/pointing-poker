import { IssueInfo } from "../../serverService/models/gameModel";
import GameCard from "../GameCard/GameCard";

interface StatisticsItem {
  cardInfo: {value: string, type: string,},
  currentIssue?: IssueInfo
}

export function StatisticsItem(props:StatisticsItem) {

  return(
    <li className="statistics__item">
      <GameCard value={props.cardInfo.value}/>
      <span>{determPart(props.currentIssue?.votes.map((vote) => vote.score) || [], props.cardInfo.value)}</span>
    </li> 
  )
}

function determPart(votes:Array<string>, currentScore:string) {
  let currentVotesAmount = 0;
   votes.forEach((vote) => {
     if(vote == currentScore) {
      currentVotesAmount++;
     }
   })
   return (Math.floor((currentVotesAmount/votes.length)*10000)) / 100;
}