import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export default interface IRoundTimeEditableProps {
  seconds: number;
  setSeconds: Dispatch<SetStateAction<number>>;
  minutes: number;
  setMinutes: Dispatch<SetStateAction<number>>;
};

export default interface IRoundTimeEditableChangeTimeParams {
  e: ChangeEvent<HTMLInputElement>;
  changeState: Dispatch<SetStateAction<number>>;
};