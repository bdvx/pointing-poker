import './RoundTimeEditable.scss';
import { FC } from 'react';
import { RoundTime } from '../Base/RoundTime/RoundTime';
import IRoundTimeEditableChangeTimeParams from '../../types/RoundTimeEditable.type';
import IRoundTimeEditableProps from '../../types/RoundTimeEditable.type';

export const RoundTimeEditable: FC<IRoundTimeEditableProps> = (props: IRoundTimeEditableProps) => {
  const { seconds, setSeconds, minutes, setMinutes } = props;

  const changeTime = ({ e, changeState }: IRoundTimeEditableChangeTimeParams): void => {
    const { value } = e.target;
    
    if (value.length > 2) return;

    changeState(+value);
  };

  return (
    <RoundTime classes="RoundTimeEditable">
      <input className="RoundTime__time" value={ minutes } onChange={ (e) => changeTime({ e, changeState: setMinutes } as IRoundTimeEditableChangeTimeParams) } type="number" min="0" />
      :
      <input className="RoundTime__time" value={ seconds } onChange={ (e) => changeTime({ e, changeState: setSeconds } as IRoundTimeEditableChangeTimeParams) } type="number" min="0" max="59" />
    </RoundTime>
  );
};