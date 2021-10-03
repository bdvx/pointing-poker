import './RoundTimePlayable.scss';
import { FC, useEffect, useState } from 'react';
import { RoundTime } from '../Base/RoundTime/RoundTime';
import { useTypedSelector } from '../../hooky/useTypedSelector';

export const RoundTimePlayable: FC = () => {
  const { isVoting } = useTypedSelector((store) => store.game);
  let { roundTime } = useTypedSelector((store) => store.settings);

  let time = roundTime;
  const [seconds, setSeconds] = useState<number>(roundTime);

  useEffect(() => {
    if (isVoting) {
      time = roundTime;
      setSeconds(roundTime);
    }

    const update = (): void => {
      if (!isVoting) return;

      --time;
      setSeconds(time);

      if (time > 0) {
        setTimeout(() => update(), 1000);
      }
    };

    setTimeout(() => update(), 1000);
  }, [isVoting, setSeconds]);

  const getMinutes = (): number => {
    return Math.floor(seconds / 60);
  };

  const getSeconds = (): string | number => {
    const exactSeconds = seconds % 60;
    return (exactSeconds < 10) ? `0${ exactSeconds }` : exactSeconds;
  };

  return (
    <RoundTime classes="RoundTimePlayable">
      <span className="RoundTime__time">{ getMinutes() }</span>
      :
      <span className="RoundTime__time">{ getSeconds() }</span>
    </RoundTime>
  );
};