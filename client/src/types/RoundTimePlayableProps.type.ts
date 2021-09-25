import { Dispatch, SetStateAction } from 'react';

export default interface IRoundTimePlayableProps {
  isStop: boolean;
  setIsStop: Dispatch<SetStateAction<boolean>>;
  secondsDefault: number;
  minutesDefault: number;
};