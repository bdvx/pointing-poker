import { IssueInfo } from "../../serverService/models/gameModel";
import GameCard from "../GameCard/GameCard";

interface StatisticsItem {
  cardInfo: {value: number, type: string,},
  currentIssue?: IssueInfo
}

export function StatisticsItem(props:StatisticsItem) {
  console.log(1, props)
  return(
    <li className="statistics__item">
      <GameCard {...props.cardInfo}/>
      <span>{determPart(props.currentIssue?.votes.map((vote) => vote.score) || [], props.cardInfo.value)}</span>
    </li> 
  )
}

function determPart(votes:Array<number>, currentScore:number) {
  let currentVotesAmount = 0;
   votes.forEach((vote) => {
     if(vote === currentScore) {
      currentVotesAmount++;
     }
   })
   return (currentVotesAmount/votes.length)*100;
}