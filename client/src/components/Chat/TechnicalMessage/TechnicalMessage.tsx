export interface TechnicalMessageProps {
  message:string,
  isTechnicalMessage: boolean
}

export function TechnicalMessage(props:TechnicalMessageProps) {
  return(
    <li className="technical__message">
      {props.message}
    </li>
  )
}