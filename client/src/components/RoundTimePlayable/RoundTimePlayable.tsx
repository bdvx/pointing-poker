import './RoundTimePlayable.scss';
import { FC, useEffect } from 'react';
import { RoundTime } from '../Base/RoundTime/RoundTime';
import { useTypedSelector } from '../../hooky/useTypedSelector';
import { useDispatch } from 'react-redux';
import { setGame } from '../../store/gameSlice';

export const RoundTimePlayable: FC = () => {
  const dispatch = useDispatch();
  const { isVoting } = useTypedSelector((store) => store.game);
  let { roundTime } = useTypedSelector((store) => store.settings);

  useEffect(() => {
    const update = (): void => {
      if (isVoting) return;

      --roundTime;

      if (roundTime <= 0) {
        // dispatch(setGame({ isVoting: false }));
        return;
      }

      setTimeout(() => update(), 1000);
    };

    setTimeout(() => update(), 1000);
  }, [isVoting, roundTime]);

  const getMinutes = (): number => {
    return Math.floor(roundTime / 60);
  };

  const getSeconds = (): string | number => {
    const exactSeconds = roundTime % 60;
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