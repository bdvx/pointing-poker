import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export interface IRoundTimeEditableProps {
  seconds: number;
  setSeconds: Dispatch<SetStateAction<number>>;
  minutes: number;
  setMinutes: Dispatch<SetStateAction<number>>;
};

export interface IRoundTimeEditableChangeTimeParams {
  e: ChangeEvent<HTMLInputElement>;
  changeState: Dispatch<SetStateAction<number>>;
};