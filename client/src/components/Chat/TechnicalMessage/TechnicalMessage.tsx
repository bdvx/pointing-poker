export interface TechnicalMessageProps {
  message:string,
  isTechnicalMessage: boolean
}

export function TechnicalMessage(props:TechnicalMessageProps) {
  console.log(2, props)
  return(
    <li className="technical__message">
      {props.message}
    </li>
  )
}