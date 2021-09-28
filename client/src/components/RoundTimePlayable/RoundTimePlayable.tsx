import './RoundTimePlayable.scss';
import { FC, useEffect, useState } from 'react';
import { RoundTime } from '../Base/RoundTime/RoundTime';
import IRoundTimePlayableProps from '../../types/RoundTimePlayableProps.type';
import { useTypedSelector } from '../../hooky/useTypedSelector';

export const RoundTimePlayable: FC<IRoundTimePlayableProps> = () => {
/*   let { secondsDefault, minutesDefault } = props; */
  const {roundTime} = useTypedSelector((store) => store.settings);
  const {isVoting} = useTypedSelector((store) => store.game);
/* 
  const [seconds, setSeconds] = useState<number>(secondsDefault);
  const [minutes, setMinutes] = useState<number>(minutesDefault); */



/*   useEffect(() => {
    const update = (): void => {
      if (isVoting) return;

      --secondsDefault;
  
      if (secondsDefault === -1) {
        secondsDefault = 59;
        --minutesDefault;
      }

      setSeconds(secondsDefault);
      setMinutes(minutesDefault);

      if (!secondsDefault && !minutesDefault) {
        setIsStop(true);
        return;
      }

      setTimeout(() => update(), 1000);
    };

    setTimeout(() => update(), 1000);
  }, [isVoting, setIsStop, setSeconds, setMinutes]); */

/*   const getUpdSeconds = (): string | number => {
    return (seconds < 10) ? `0${ seconds }` : seconds;
  }; */

  return (
/*     <RoundTime classes="RoundTimePlayable">
      <span className="RoundTime__time">{ minutes }</span>
      :
      <span className="RoundTime__time">{ getUpdSeconds() }</span>
    </RoundTime> */
    <></>
  );
};